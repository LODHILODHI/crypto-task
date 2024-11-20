export declare class DummyService {
    getPrices(): void;
    static setPriceAlert(arg0: string, arg1: number, arg2: string): void;
    private prices;
    private priceAlerts;
    fetchAndSavePrices(): Promise<{
        ethereum: number | null;
        polygon: number | null;
    }>;
    setPriceAlert(chain: string, alert: boolean): void;
    private isWithinOneHour;
    private sendEmailNotification;
}
export declare class SwapService {
    getSwapRate(ethAmount: number): Promise<{
        btcAmount: number;
        feeInEth: number;
        feeInUsd: number;
        feePercentage: number;
    }>;
}
