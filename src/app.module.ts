import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { FilesModule } from './files/files.module';
import { MessageWsModule } from './message-ws/message-ws.module';
import { GenericoFlutterModule } from './generico_fluuter/generico-flutter.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl:
          process.env.STAGE === 'prod' ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //talvez no convenga que esté en true en produccion
      //porque en produccion mas que todo modificamos con migraciones, esto 
      //podemos manejar tambien con variables de entorno
    }),
    AuthModule,
    CommonModule,
    SeedModule,
    ProyectoModule,
    FilesModule,
    MessageWsModule,
    GenericoFlutterModule,
  ],
})
export class AppModule {}
