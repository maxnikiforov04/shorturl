import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class ShortUrlService {
  constructor(private readonly prisma: PrismaService) {}

  async shortenUrl(originalUrl: string, userId: number) {
    const shortUrl = this.generateShortUrl();
    const link = await this.prisma.link.upsert({
      where: { originalUrl },
      update: {},
      create: {
        originalUrl,
        shortUrl,
      },
    });
    await this.prisma.userLink.upsert({
      where: {
        userId_linkId: {
          userId,
          linkId: link.id,
        },
      },
      update: {},
      create: {
        userId,
        linkId: link.id,
      },
    });

    return link;
  }

  async getUserLinks(userId: number) {
    const userLinks = await this.prisma.userLink.findMany({
      where: { userId: Number(userId) },
      include: { link: true },
    });

    return userLinks.map((userLink) => userLink.link);
  }

  async expandUrl(shortUrl: string) {
    const link = await this.prisma.link.findUnique({
      where: { shortUrl },
    });
    return link?.originalUrl || null;
  }

  private generateShortUrl(): string {
    return nanoid(10);
  }
}
