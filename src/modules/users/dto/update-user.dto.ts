import { IsEmail, IsString } from 'class-validator'
import { Optional } from '@nestjs/common'

export class UpdateUserDto {
  @Optional()
  @IsEmail()
  email: string

  @Optional()
  @IsString()
  name: string

  @Optional()
  @IsString()
  password: string
}
