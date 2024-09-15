import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class ShortUrlService {
  constructor(private readonly prisma: PrismaService) {}

  async shortenUrl(originalUrl: string) {
    const shortUrl = this.generateShortUrl();
    return await this.prisma.link.upsert({
      where: { originalUrl },
      update: {},
      create: {
        originalUrl,
        shortUrl,
      },
    });
  }

  async expandUrl(shortUrl: string) {
    const link = await this.prisma.link.findUnique({
      where: { shortUrl },
    });
    return link?.originalUrl || null;
  }

  private generateShortUrl(): string {
    return nanoid(10); // Генерация короткой ссылки длиной 10 символов
  }
}
