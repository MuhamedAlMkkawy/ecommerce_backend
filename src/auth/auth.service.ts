import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dtos';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { UserService } from 'src/user/user.service';


const scrypt = promisify(crypto.scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService : UserService
  ) {}

  // =============== > SIGNUP
  async signup(body: SignupDto) {
    const { email, password, ...rest } = body;

    // 🔍 Check if email already exists
    const userFound = await this.userService.findUser(email);

    if (userFound.length > 0 ) {
      throw new BadRequestException('This email is already used 😡');
    }

    // 🔐 Generate salt and hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password.toString(), salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    // 🧩 Create new user
    this.userService.createUser({
      ...rest,
      email,
      password : hashedPassword,
    });
  }

  // =============== > LOGIN 
  async login(email : string , password : string){
    const [user] =  await this.userService.findUser(email)
    
    if(!user){
      throw new BadRequestException("This Email isn't Found😡")
    }
    const [salt , storedHash] = user.password.split('.')
    const hash = (await scrypt(password.toString() , salt , 32)) as Buffer;
    
    

    if (hash.toString('hex') !== storedHash) {
      throw new NotFoundException('There is Error Found in Email / Password')
    }
    return  user;
  }
} 


