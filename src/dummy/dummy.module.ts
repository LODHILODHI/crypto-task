import { Module } from '@nestjs/common';
import { DummyController, SwapController } from './dummy.controller';
import { DummyService, SwapService } from './dummy.service';

@Module({
  imports: [],
  controllers: [DummyController,SwapController],
  providers: [DummyService,SwapService],
})
export class DummyModule {}
