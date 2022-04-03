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
      log.info(`Request..., ${req.path},${JSON.stringify(req.query)}`);
      // 前端触发了上报
      log.info('[req.body]', req.body);
      console.log('[req.body]', req.body);
      if (req.path === '/zs.gif') {
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

          const result: Base = await baseRepositoryCopy.save(access);
          // console.log('xxx', result)
          // let  access: Base[] = await baseRepositoryCopy.find();
          // console.log('access', access)
        } catch (e) {
          log.error(e.message);
          logErrorStack.error(e);
          console.log(e);
          // nginx zuo11.com/statistics/zs.js => zuo1.com:3000
        }
      }
      next();
    };
  }
}
