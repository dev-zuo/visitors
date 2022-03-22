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
        
      }
      next();
    }
  }
}
