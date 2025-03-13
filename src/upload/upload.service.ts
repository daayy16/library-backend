import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(
    private supabaseService: SupabaseService,
    private configService: ConfigService,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const supabase = this.supabaseService.getClient();
    const fileName = `${uuidv4()}-${file.originalname}`;

    const { data, error } = await supabase.storage
      .from('upload-book')
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) throw new HttpException(error, HttpStatus.BAD_REQUEST);

    return fileName;
  }

  async getFileUrl(fileName: string): Promise<string> {
    return `${this.configService.get<string>('SUPABASE_URL')}/storage/v1/object/public/upload-book/${fileName}`;
  }
}
