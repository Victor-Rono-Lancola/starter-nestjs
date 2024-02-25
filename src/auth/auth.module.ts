/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './services/auth/auth.service';
import { RtdbService } from 'src/firebase/rtdb/rtdb/rtdb.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './services/jwt/jwt.service';

@Module({
    controllers: [AuthController],
    imports: [
        FirebaseModule,
        HttpModule,
        JwtModule.register({
            secret:
                'EIpS8kOtibNCC5vJ39KW4VRuWHZoMw4k9paGkRQYRJlW8xUOtzZ25uGIZHIhEiap', // Replace 'your_secret_key_here' with your actual secret key
            signOptions: { expiresIn: '2h' }, // Adjust as needed
        }),
    ],
    providers: [AuthService, RtdbService, JwtService],
})
export class AuthModule { }
