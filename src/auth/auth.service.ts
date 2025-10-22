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
import { JwtService } from '@nestjs/jwt';


const scrypt = promisify(crypto.scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService : UserService ,
    private jwtService : JwtService
  ) {}

  // ===============> SIGNUP
  async signup(body: SignupDto) {
    const { email, password, confirmPassword , ...rest } = body;

    // 🔍 Check if email already exists
    const userFound = await this.userService.findUser(email);

    if (userFound.length > 0 ) {
      throw new BadRequestException('This email is already used 😡');
    }
    
    
    if(password !== confirmPassword) {
      throw new BadRequestException('Password mismatches with confirm password😡');
    }
    // 🔐 Generate salt and hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    const generetedToken =  this.jwtService.sign({email})


    const newUser = {
      ...rest,
      email,
      token : generetedToken,
      password : hashedPassword,
    }

    // 🧩 Create new user
    this.userService.createUser(newUser);

    return newUser
  }

  // ===============> LOGIN 
  async login(email : string , password : string){
    const [user] =  await this.userService.findUser(email)
    
    if(!user){
      throw new BadRequestException("Please Check the information you Entered😡")
    }


    const [salt , storedHash] = user.password.split('.')
    const hash = (await scrypt(password , salt , 32)) as Buffer;
    
    
    console.log(hash.toString('hex'))
    console.log(storedHash)
    if (hash.toString('hex') !== storedHash) {
      throw new NotFoundException('Please Check the information you Entered')
    }
    return  user;
  }
} 


