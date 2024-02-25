/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';

@Module({
  providers: [UsersService, RtdbService],
  controllers: [UsersController],
})
export class UsersModule { }
