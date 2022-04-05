import { Injectable, Res, HttpStatus, Req, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import * as UaParser from 'ua-parser-js';
import isMobile from 'ismobilejs';
import { EntityManager } from 'typeorm';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Base } from './base.entity';
import { HttpService } from '@nestjs/axios';
import * as iconvLite from 'iconv-lite';
import { logger } from '../utils/logger';
import { DOMAIN_ID_CONFIG } from '../config/domainId';

let baseRepositoryCopy = null;
let httpServiceCopy = null;
const log = logger('base');
const logErrorStack = logger('errorStack');

@Injectable()
export class BaseService {
  constructor(
    @InjectRepository(Base)
    private readonly baseRepository: Repository<Base>,
    @InjectEntityManager('default')
    private entityManager: EntityManager,
    private httpService: HttpService,
  ) {
    // static 方法拿不到 this，main.ts 全局拦截又需要 static
    baseRepositoryCopy = baseRepository;
    httpServiceCopy = httpService;
  }

  async findAccess(@Res() res: Response, @Req() req: Request, @Query() query) {
    log.info(query);
    const { pageIndex = 1, pageCount = 20 } = query;
    const result: Base[] = await this.baseRepository.find({
      order: {
        time: 'DESC',
      },
      skip: (pageIndex - 1) * pageCount,
      take: pageCount,
    });

    const [totalResult] = await this.entityManager.query(
      `SELECT COUNT(*) as total FROM base`,
    );
    log.info(totalResult.total);
    res.status(HttpStatus.OK).json({
      code: 0,
      data: {
        list: result,
        total: totalResult.total - 0,
      },
      msg: '请求成功!',
    });
  }

  saveAccessData(@Res() res: Response) {
    console.log('接收到请求');
    res.status(HttpStatus.OK).json({
      code: 0,
      msg: '请求成功!',
    });
  }

  // gif 上报拦截处理
  static gifReportHandler() {
    // console.log(this.accessRepository)
    return async (req, res, next) => {
      const printLog = `Request..., ${req.path},${JSON.stringify(req.query)}`;
      console.log(printLog);
      log.info(printLog);

      // 统计代码 zs.js 鉴权拦截逻辑
      if (req.path === '/zs.js') {
        console.log('zs.js', req.path, req.query, req.hostname);
        const statisticsKey = Object.keys(req.query)[0]; // 统计文件 id { '183281668cc3440449274d1f93c04de6': '' }
        const { host, referer } = req.headers;
        // host 为接口 url 的 host 部分
        // test.baidu.com 页面，script 引入 127.0.0.1:3000/zs.js 这时，请求头 referer 中可以拿到调用接口时的域名
        // referer http://test.baidu.com:3000/
        const { hostname } = new URL(referer);
        console.log('hostname', req.headers, host, referer, hostname);
        // TODO: 数据库查询，是否有权限、当前所在的域名与ID 是否匹配，否则不允许加载统计 js
        let errMsg = '';
        if (!DOMAIN_ID_CONFIG[hostname]) {
          errMsg = '该域名未在 zuo_statistics 系统中绑定';
        } else if (DOMAIN_ID_CONFIG[hostname] !== statisticsKey) {
          errMsg =
            '当前域名与上报 ID 不匹配，请登录 zuo_statistics 系统检查统计代码';
        }
        log.info('是否拦截 errMsg:', errMsg);
        console.log('是否拦截 errMsg:', errMsg);
        if (errMsg) {
          res.status(HttpStatus.FORBIDDEN).json({ code: 403, msg: errMsg });
          return;
        }
      } else if (req.path === '/zs.gif') {
        try {
          const data = JSON.parse(req.query.data); // zs.gif?data={a:1,b:2}
          log.info('data', data);
          const { perf, href, navData, screen, network, pathname, referrer } =
            data;
          // IP、IP归属地（可用于地域统计，用于屏蔽恶意 IP 爬虫、骚扰）、宽带类型、origin/host 同源检测、页面跳转还是直接访问：Referer、UA,PV,页面怎么计算
          const { 'user-agent': ua } = req.headers;
          // referrer
          const uaObj = UaParser(ua);
          uaObj.ua = '';
          const access = new Base();
          let ipInfo: any = {};
          let ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress;
          log.info('ip', ip); // try to catch ip === null 场景
          if (ip && ip.substr(0, 7) == '::ffff:') {
            ip = ip.substr(7);
          }
          try {
            const res = await httpServiceCopy
              .get(
                'http://whois.pconline.com.cn/ipJson.jsp?ip=' +
                  ip +
                  '&json=true',
                {
                  responseType: 'arraybuffer',
                },
              )
              .toPromise();
            ipInfo = iconvLite.decode(res.data, 'gbk');
            ipInfo = JSON.parse(ipInfo);
            log.info('res', ipInfo);
          } catch (e) {
            log.error(e.message);
            logErrorStack.info(e);
          }
          Object.assign(access, {
            ip: ip,
            region: ipInfo.addr || '', // 请求接口获取
            networkServe: ipInfo.addr || '', // 请求接口获取
            count: 0, // 第几次访问
            referer: referrer,

            perf_load: perf.calcData.Loaded,
            perf_dom_content_loaded: perf.calcData.DOMContentLoaded,
            perf_ttfb: perf.calcData['Waiting(TTFB)'],
            performance_timing: JSON.stringify(perf.raw),
            perf_calcData: JSON.stringify(perf.calcData),

            ua,
            uaInfo: JSON.stringify(uaObj),
            isMobile: isMobile(ua).any,
            platform: navData.platform,
            lang: navData.language,
            hardware_concurrency: navData.hardwareConcurrency,
            deviceMemory: navData.deviceMemory,
            cookieEnabled: navData.cookieEnabled,
            network,
            href,
            pathname,
            screen: screen.size,
            screen_info: JSON.stringify(screen),
          });
          log.info(access);

          await baseRepositoryCopy.save(access);
        } catch (e) {
          log.error(e.message);
          logErrorStack.error(e);
          console.log(e);
        }
      }
      next();
    };
  }
}
