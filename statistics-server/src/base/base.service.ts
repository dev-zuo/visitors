import { Injectable, Res,HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class BaseService {
  saveAccessData(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      code: 0,
      msg: '请求成功!'
    });
  }

  // gif 上报拦截处理
  static gifReportHandler() {
    return (req, res, next) => {
      console.log(`Request..., ${req.path},${JSON.stringify(req.query)}`);
      // 前端触发了上报
      if (req.path === '/zs.gif') {
        try {
          let data = JSON.parse(req.query.data)
          console.log('data', data)
          // IP、IP归属地（可用于地域统计，用于屏蔽恶意 IP 爬虫、骚扰）、宽带类型、origin/host 同源检测、页面跳转还是直接访问：Referer、UA,PV,页面怎么计算
          let {referer, 'user-agent': ua, origin} = req.headers
          console.log(req.ip,req.ips, req.headers, referer)
          
        } catch(e) {
          console.error(e)
          // nginx zuo11.com/statistics/zs.js => zuo1.com:3000
        }
      }
      next();
    }
  }
}
