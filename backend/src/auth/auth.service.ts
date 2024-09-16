import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { username } });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(email: string, username: string, password: string) {
    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail || existingUsername) {
      if (existingEmail) {
        throw new ConflictException('Email already exist');
      } else {
        throw new ConflictException('Username already exist');
      }
    }

    const user = await this.prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        username,
        password,
      },
    });
    return user;
  }
}
