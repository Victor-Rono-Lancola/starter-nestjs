/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { HttpModule } from '@nestjs/axios';
import { FirebaseModule } from './firebase/firebase.module';
import * as admin from 'firebase-admin';
import { firebaseConfig, serviceAccount } from './config/firebase.config';
import { CronJobsModule } from './cron-jobs/cron-jobs.module';
import { CurrencyService } from './currency/controllers/currency.service';
import { RtdbService } from './firebase/rtdb/rtdb/rtdb.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { DocumentsModule } from './documents/documents.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';

@Module({
  imports: [CurrencyModule, FileModule, HttpModule, FirebaseModule, CronJobsModule, AuthModule, UsersModule, /*PaymentsModule,*/ DocumentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '', 'uploads'),
      // serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CurrencyService,
    RtdbService,
    {
      provide: 'FirebaseAdmin',
      useValue: admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
        databaseURL: firebaseConfig.databaseURL,
      }),
    },


  ],

})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply((req, res, next) => {
  //       res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //       res.header(
  //         'Access-Control-Allow-Methods',
  //         'GET,HEAD,PUT,PATCH,POST,DELETE',
  //       );
  //       res.header(
  //         'Access-Control-Allow-Headers',
  //         'Origin, X-Requested-With, Content-Type, Accept',
  //       );
  //       res.header('Access-Control-Allow-Credentials', 'true');
  //       next();
  //     })
  //     .forRoutes('*');
}

