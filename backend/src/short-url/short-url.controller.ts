import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { Public } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('')
export class ShortUrlController {
  constructor(private readonly shortUrlService: ShortUrlService) {}
  @Public()
  @Post('shorten')
  async shortenUrl(
    @Body('originalUrl') originalUrl: string,
    @Body('userId') userId: number,
  ) {
    const link = await this.shortUrlService.shortenUrl(originalUrl, userId);
    return { shortUrl: link.shortUrl };
  }
  @Public()
  @Get('user-links/:userId')
  async getUserLinks(@Param('userId') userId: number) {
    const links = await this.shortUrlService.getUserLinks(userId);
    return { links };
  }
  @Public()
  @Get('expand/:shortUrl')
  async expandUrl(@Param('shortUrl') shortUrl: string) {
    const originalUrl = await this.shortUrlService.expandUrl(shortUrl);
    if (!originalUrl) {
      throw new NotFoundException('Short URL not found');
    }
    return { originalUrl };
  }
  @Public()
  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const originalUrl = await this.shortUrlService.expandUrl(shortUrl);
    return res.redirect(originalUrl);
  }
}
