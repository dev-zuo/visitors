import { Controller, Get, Res, Post, Req, Body} from '@nestjs/common';
import { Response, Request } from 'express';
import { BaseService } from './base.service';

@Controller('base')
export class BaseController {
  constructor(readonly baseService: BaseService) {}

  @Post('pageUnload')
  saveAccessData(@Req() request: Request, @Res() res: Response, @Body() payload : any) {
    // GET /base/imgUnload
    try {
      console.log(payload, typeof payload)
      let data = JSON.parse(payload)
      console.log('data', data)
    } catch(e) {
      console.log('error', e)
    }
    
    return this.baseService.saveAccessData(res);
  }
}
