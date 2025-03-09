import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [UsersController],
  providers: [{
    provide: 'USERS_SERVICE',
    useClass: UsersService
  }]
})
export class UsersModule { }
