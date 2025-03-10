import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/typeorm';
import { UsersService } from 'src/users/users.service';

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
    }]
})
export class BooksModule {}
