import {
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsBoolean,
} from 'class-validator'

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title!: string

  @IsOptional()
  @IsString()
  content!: string

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags!: string[]
}
