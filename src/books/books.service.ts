import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from 'src/typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
    constructor(
      @InjectRepository(Book)
      private readonly bookRepository: Repository<Book>,
      @Inject('USERS_SERVICE')
              private readonly userService: UsersService,
    ) { }
  async create(dto: CreateBookDto) {
    const owner = await this.userService.getUserByEmail(dto.userEmail)
    if(!owner) {
      throw new NotFoundException('User not found')
    }

    const book = this.bookRepository.create({...dto, owner})
    this.bookRepository.save(book);
    return { message: 'The book was saved'}
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
