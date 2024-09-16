import { Module } from '@nestjs/common';
import { ShortUrlModule } from './short-url/short-url.module';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ShortUrlModule, PrismaModule, AuthModule],
})
export class AppModule {}
