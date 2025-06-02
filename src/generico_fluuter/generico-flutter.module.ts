import { Module } from '@nestjs/common';
import { GenericoFlutterService } from './generico-flutter.service';
import { GenericoFlutterController } from './generico-flutter.controller';
import { GenericoFlutterGitService } from './generico-flutter-git.service';
import { GeminiService } from './geminiservice.service';

@Module({
  controllers: [GenericoFlutterController],
  providers: [GenericoFlutterService,GenericoFlutterGitService,GeminiService],
})
export class GenericoFlutterModule {}
