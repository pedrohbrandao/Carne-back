import { InjectModel } from '@nestjs/sequelize';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { User } from './user.model';
import { AuthService } from 'src/auth/auth.service';
import { log } from 'console';



@Injectable()
export class UsersService {
  @InjectModel(User)
    private usersmodel: typeof User
    
  constructor(
    @Inject(forwardRef(() => AuthService))
    private passwordG: AuthService,
  ) {}

  async newuser(request: any): Promise<any>{
    const password = await this.passwordG.generateHash(request.password)
    return this.usersmodel.create({
      username: request.username,
      password: password
      })
    }
    
    async findOne(username: string): Promise<User | undefined> {
      return this.usersmodel.findOne({
        where: {
      username:username
    }});
    }
  
    async findall(): Promise<any> {
      return this.usersmodel.findAll({})
  }
}
