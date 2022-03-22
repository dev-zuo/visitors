import { Controller, Get, Res} from '@nestjs/common';
import { Response } from 'express';
import { BaseService } from './base.service';

@Controller('base')
export class BaseController {
  constructor(readonly baseService: BaseService) {}

  @Get('zs.js')
  saveAccessData(@Res() res: Response) {
    // GET /base/zs.js
    return this.baseService.saveAccessData(res);
  }
}
