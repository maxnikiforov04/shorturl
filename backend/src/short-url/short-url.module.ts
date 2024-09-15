import { Module } from '@nestjs/common';
import { ShortUrlController } from './short-url.controller';
import { ShortUrlService } from './short-url.service';
import { PrismaService } from 'prisma/prisma.service';
@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService, PrismaService],
})
export class ShortUrlModule {}
