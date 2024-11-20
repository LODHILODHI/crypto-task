import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DummyController } from './dummy/dummy.controller';
import { DummyModule } from './dummy/dummy.module';
import { DummyService } from './dummy/dummy.service';

@Module({
  imports: [DummyModule],
  controllers: [AppController,DummyController],
  providers: [AppService,DummyService],
})
export class AppModule {}
