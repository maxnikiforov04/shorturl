import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  HttpException,
  Post,
  Request,
} from '@nestjs/common';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    return await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
    @Body('checkedPassword') checkedPassword: string,
  ) {
    try {
      const user = await this.authService.resetUserPassword(
        email,
        newPassword,
        checkedPassword,
      );
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to reset password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.authService.signUp(email, username, password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
