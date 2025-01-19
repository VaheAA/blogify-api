import {
  IsString,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsBoolean,
} from 'class-validator'

export class CreatePostDto {
  @IsString()
  title!: string

  @IsString()
  content!: string

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags!: string[]
}
