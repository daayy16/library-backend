import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { UploadService } from 'src/upload/upload.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [BooksController],
    providers: [{
      provide: 'BOOKS_SERVICE',
      useClass: BooksService
    },
    {
      provide: 'USERS_SERVICE',
      useClass: UsersService
    },
  {
      provide: 'UPLOAD_SERVICE',
      useClass: UploadService
  },
    SupabaseService]
})
export class BooksModule {}
