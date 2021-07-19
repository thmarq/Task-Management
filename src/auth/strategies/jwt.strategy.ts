import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from "../entities/user.entity";
import { UserRepository } from "../repository.ts/auth.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository
  ) {
    super({ // super calling constructor of base class
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('bearer'),
      secretOrKey: 'topSecretKey'
    })
  }

  async validate(payload: any): Promise<User> {
    const { username } = payload;
    let user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException()
    }
    return user;
  }
}