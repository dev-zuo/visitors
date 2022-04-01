import { Controller, Get, Res, Post, Req, Body, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseService } from './base.service';

@Controller('base')
export class BaseController {
  constructor(readonly baseService: BaseService) {}

  @Get('access')
  findAccess(@Res() res: Response, @Req() req: Request, @Query() query) {
    return this.baseService.findAccess(res, req, query);
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
