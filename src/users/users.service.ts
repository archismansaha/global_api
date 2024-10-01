import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly redisService: RedisService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({ ...createUserDto, password: hashedPassword });
    
    await user.save();
    

    await this.redisService.set(`user:${user.id}`, user, 60); 
    return user;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({ ...createUserDto, password: hashedPassword });
    
    await user.save();
    
  
    await this.redisService.set(`user:${user.id}`, user, 60); 
    return user;
  }

  async findById(id: string): Promise<User> {
    const cachedUser = await this.redisService.get<User>(`user:${id}`);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.redisService.set(`user:${id}`, user, 60); 
    return user;
  }

  async updateUser(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.redisService.set(`user:${id}`, user, 60); 
    return user;
  }

  async findAll(): Promise<User[]> {
    const cachedUsers = await this.redisService.get<User[]>('users');
    if (cachedUsers) {
      return cachedUsers;
    }

    const users = await this.userModel.find().exec();
    

    await this.redisService.set('users', users, 60); 
    return users;
  }
}
