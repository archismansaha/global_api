import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const validatepassword = await bcrypt.compare(password,user.password);
    
    if (user && validatepassword ) {
    console.log(user);
    const payload = { user: user,timestamp:new Date()};
    return {
      access_token: this.jwtService.sign(payload, {secret:process.env.JWT_SECRET||'your_secret_key'}),
    };
    }
    else{
      throw new Error(`Invalid username or password`);
    }
   
  }
}
