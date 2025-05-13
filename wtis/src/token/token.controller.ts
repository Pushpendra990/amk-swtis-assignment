// src/token/token.controller.ts
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

 @Get()
  @HttpCode(HttpStatus.OK)
  async getToken(@Query('key') key: string) {
    const tokenInfo = await this.tokenService.getTokenInfo(key);
    return {
      statusCode: HttpStatus.OK,
      message: 'Token fetched successfully',
      data: tokenInfo,
    };
  }
}
