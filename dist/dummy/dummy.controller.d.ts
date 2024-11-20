import { DummyService, SwapService } from './dummy.service';
export declare class DummyController {
    private readonly dummyService;
    constructor(dummyService: DummyService);
    getHello(): Promise<{
        ethereum: number | null;
        polygon: number | null;
    }>;
    getHello1(): Promise<void>;
}
export declare class SwapController {
    private readonly swapService;
    constructor(swapService: SwapService);
    getSwapRate(ethAmount: number): Promise<{
        btcAmount: number;
        feeInEth: number;
        feeInUsd: number;
        feePercentage: number;
    } | {
        error: string;
    }>;
}
