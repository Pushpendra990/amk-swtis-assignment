import { Controller, Post, Body, Get, Delete, Param, Put, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AccessKeyService } from '../access-key/access-key.service';
const dotenv= require('dotenv')
dotenv.config()
const ADMIN_SECRET = 'ADCBDCKDL1213242ddfldfdlfdl33434';

@Controller('admin')
export class AdminController {
  constructor(private readonly accessKeyService: AccessKeyService,
  ) {}

  private isAdmin(headers: any): boolean {
    return headers['authorization'] === `Bearer ${ADMIN_SECRET}`;
  }

  @Post('key')
  async createKey(@Body() body, @Headers() headers) {
    if (!this.isAdmin(headers)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const key = await this.accessKeyService.create(body.rateLimit, body.ttlMinutes);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Key created successfully',
      data: key,
    };
  }

  @Put('key/:key')
  async updateKey(@Param('key') key: string, @Body() body, @Headers() headers) {
    if (!this.isAdmin(headers)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const updatedKey = await this.accessKeyService.update(key, body.rateLimit, body.ttlMinutes);
    return {
      statusCode: HttpStatus.OK,
      message: 'Key updated successfully',
      data: updatedKey,
    };
  }

  @Delete('key/:key')
  async deleteKey(@Param('key') key: string, @Headers() headers) {
  
    if (!this.isAdmin(headers)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    await this.accessKeyService.delete(key);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Key deleted successfully',
    };
  }


 @Get('keys')
  async list(@Headers() headers) {
    if (!this.isAdmin(headers)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const keys = await this.accessKeyService.list();
    return {
      statusCode: HttpStatus.OK,
      data: keys,
    };
  }
}
