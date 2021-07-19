import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repository.ts/auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "topSecretKey",
      signOptions: {
        expiresIn: 3600,
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule { }
