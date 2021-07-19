//used for signup and sign in

import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentailsDto {

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password is too weak' })
  password: string;
}