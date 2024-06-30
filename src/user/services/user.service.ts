import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';

import { UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { ErrorHandler } from 'src/error-handler/decorators/error-handler.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class UserService {
  private queryRunner!: QueryRunner;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  @ErrorHandler()
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
    });
    return { users };
  }

  @ErrorHandler()
  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return { user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({ id, ...updateUserDto });

    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.save(user);

    return user;
  }

  @ErrorHandler()
  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');

    user.isActive = false;
    await this.userRepository.save(user);
  }
}
