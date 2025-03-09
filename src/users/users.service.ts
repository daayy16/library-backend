import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/index';
import { Repository } from 'typeorm';
import { encodePassword } from './../utils/bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(dto: CreateUserDto) {
    const existingUser = await this.getUserByEmail(dto.email)
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const password = encodePassword(dto.password);
    const user = this.userRepository.create({ ...dto, password });
    return this.userRepository.save(user)
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getUserByEmail(email: string){
    return this.userRepository.findOneBy({email})
  }
}
