import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthEntity } from './entities/auth.entities';
import { SignupDto } from './dtos/signup.dtos';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import * as crypto from 'crypto';


const scrypt = promisify(crypto.scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private repo: Repository<AuthEntity>,
  ) {}

  // =============== > SIGNUP
  async signup(body: SignupDto) {
    const { email, password, ...rest } = body;

    // 🔍 Check if email already exists
    const userFound = await this.repo.findBy({ email });

    if (userFound.length > 0 ) {
      throw new BadRequestException('This email is already used 😡');
    }

    // 🔐 Generate salt and hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password.toString(), salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    // 🧩 Create new user
    const newUser = this.repo.create({
      ...rest,
      email,
      password : hashedPassword,
    });

    // 💾 Save to database
    const savedUser = await this.repo.save(newUser);

    // ✅ Return safe response
    return savedUser
  }

  // =============== > LOGIN 
  async login(email : string , password : string){
    const [user] =  await this.repo.findBy({email})
    
    if(!user){
      throw new BadRequestException("This Email isn't Found😡")
    }
    console.log('1')
    const [salt , storedHash] = user.password.split('.')
    console.log('2')
    const hash = (await scrypt(password , salt , 32)) as Buffer;
    console.log('3')
    
    

    if (hash.toString('hex') !== storedHash) {
      throw new NotFoundException('There is Error Found in Email / Password')
    }

    return user
  }
} 


