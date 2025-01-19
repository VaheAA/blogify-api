import { Injectable, BadRequestException } from '@nestjs/common'
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import { Readable } from 'stream'

@Injectable()
export class FileUploadService {
  async uploadFile(
    file: Express.Multer.File,
    userId: number,
  ): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('File is required')
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `avatars/${userId}`, // Organize avatars under user IDs
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        },
      )

      const bufferStream = new Readable()
      bufferStream.push(file.buffer)
      bufferStream.push(null)
      bufferStream.pipe(uploadStream)
    })
  }
}
