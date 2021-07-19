import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TokenUser } from './decorators/token-user.decorator';
import { AuthCredentailsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Post('/signup',)
  async signUp(@Body(ValidationPipe) dto: AuthCredentailsDto) {
    return await this.authService.signUp(dto);
  }

  @Post('/signin',)
  async signIn(@Body(ValidationPipe) dto: AuthCredentailsDto): Promise<{ accessToken: string }> {
    return await this.authService.validateUserPassword(dto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // can provide guard in controller level or each route level
  async testing(@TokenUser() tokenUser: any) {
    console.log("_____Request", tokenUser);

  }
}
