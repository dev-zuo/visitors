import { Controller, Get, Res, Post, Req, Body, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseService } from './base.service';

@Controller('base')
export class BaseController {
  constructor(readonly baseService: BaseService) {}

  // 实时访客 - 访客列表 /base/access
  @Get('access')
  findAccess(@Res() res: Response, @Req() req: Request, @Query() query) {
    return this.baseService.findAccess(res, req, query);
  }

  // 实时访客 - 访问路径 /base/accessPath
  @Get('accessPath')
  findAccessPath(@Res() res: Response, @Req() req: Request, @Query() query) {
    return this.baseService.findAccessPath(res, req, query);
  }

  // 网站概况 - 获取某个时间段（今天/昨天/最近7天等）的 PV、UV、IP 数
  // base/overview/getUvPv
  @Get('overview/getUvPv')
  overviewGetUvPv(@Res() res: Response, @Req() req: Request, @Query() query) {
    return this.baseService.overviewGetUvPv(res, req, query);
  }

  @Post('pageUnload')
  saveAccessData(
    @Req() request: Request,
    @Res() res: Response,
    @Body() payload: any,
  ) {
    // GET /base/imgUnload
    try {
      console.log(payload, typeof payload);
      const data = JSON.parse(payload);
      console.log('data', data);
    } catch (e) {
      console.log('error', e);
    }

    return this.baseService.saveAccessData(res);
  }
}
