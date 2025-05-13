// src/access-key/access-key.controller.ts
import { Controller, Get, Param, Delete, NotFoundException, HttpStatus, HttpCode } from '@nestjs/common';
import { AccessKeyService } from './access-key.service';

@Controller('key')
export class AccessKeyController {
  constructor(private readonly service: AccessKeyService) {}

  @Get(':key')
  async getKey(@Param('key') key: string) {
    const keyData = await this.service.getByKey(key);
    if (!keyData) {
      throw new NotFoundException('Key not found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Key retrieved successfully',
      data: keyData,
    };
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  async disable(@Param('key') key: string) {
    await this.service.disableKey(key);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Deleted successfully',
    };
  }
  
}
