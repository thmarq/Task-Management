import { ConflictException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentailsDto } from './dtos/auth-credentials.dto';
import { UserRepository } from './repository.ts/auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private logger = new Logger('AuthService')

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService // jwt module provide a jwt service
  ) { }


  async signUp(dto: AuthCredentailsDto) {
    const salt = await bcrypt.genSalt();
    let password = await this.generateHashPassword(dto.password, salt);

    try {
      let resp = await this.userRepository.create(Object.assign({}, dto, { password: password, salt: salt })).save();
      console.log("New User Created ____", resp);
      return resp;
    } catch (e) {

      if (e.code === "23505") { //23505 for unique field error
        console.log("Error Code ____", e.code)
        throw new ConflictException('User name already exists !')
      } else {
        new InternalServerErrorException()
      }
    }

  }

  //generate password
  private async generateHashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async validateUserPassword(dto: AuthCredentailsDto): Promise<{ accessToken: string }> {
    const { username, password } = dto;
    let user = await this.userRepository.findOne({ username });

    if (user && await user.validatePassword(password)) {
      let username = user.username;
      //generate token
      
      const payload = { username }; //es6 return obj with key username and value is username of that user
      const accessToken = await this.jwtService.sign(payload)
      this.logger.debug("Generating JWT Token")
      console.log("access token is ____", accessToken);
      
      return { accessToken };
    } else {
      throw new UnauthorizedException("Invalid Credentials !");
    }

    const payload = {}

  }
}
