import { Controller, Get, Param, Post, Body, Res } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { Response } from 'express';

@Controller()
export class ShortUrlController {
  constructor(private readonly ShortUrlService: ShortUrlService) {}

  @Post('shorten')
  async shorten(@Body() body: { url: string }) {
    return await this.ShortUrlService.shortenUrl(body.url);
  }

  @Get('expand/:shortUrl')
  async expand(@Param('shortUrl') shortUrl: string) {
    const baseUrl = await this.ShortUrlService.expandUrl(shortUrl);
    if (!baseUrl) {
      return {
        message: 'URL not found',
        statusCode: 404,
      };
    }
    return {
      baseUrl,
    };
  }

  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const originalUrl = await this.ShortUrlService.expandUrl(shortUrl);
    return res.redirect(originalUrl);
  }
}
