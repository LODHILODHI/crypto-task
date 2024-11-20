// dummy.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { DummyService,SwapService } from './dummy.service';

@Controller('dummy')
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}

  @Get("fetchprice")
  async getHello() {
    const result = await this.dummyService.fetchAndSavePrices();
    return result; // Return the object received from fetchAndSavePrices
  }

  @Get('set-alert')
  async getHello1() {
    const result=this.dummyService.setPriceAlert("ethereum", true);
    return result; // Return the object received from fetchAndSavePrices
  }
}


@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Get('rate')
  async getSwapRate(@Query('ethAmount') ethAmount: number) {
    if (!ethAmount || ethAmount <= 0) {
      return { error: 'Invalid Ethereum amount' };
    }

    const result = await this.swapService.getSwapRate(ethAmount);
    return result;
  }
}
