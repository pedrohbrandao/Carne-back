import { UsersService } from './../users/users.service';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class AuthService {

    
  constructor(
    private jwtService:JwtService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async generateHash(password: any): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash
  }
  
  async comparePassword(password, haspassword): Promise<boolean>{
    const isMatch = await bcrypt.compare(password, haspassword);
    return isMatch
  }
    
    
  // import bcrypt
    async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username)
      const password = await this.comparePassword(pass, user.password);
    if (user && password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
    }
    async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
