"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapService = exports.DummyService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const axios_1 = require("axios");
const nodemailer = require("nodemailer");
let DummyService = class DummyService {
    constructor() {
        this.prices = [];
        this.priceAlerts = {};
    }
    getPrices() {
        throw new Error('Method not implemented.');
    }
    static setPriceAlert(arg0, arg1, arg2) {
        throw new Error('Method not implemented.');
    }
    async fetchAndSavePrices() {
        try {
            const chains = ['ethereum', 'matic-network'];
            const response = await axios_1.default.get(`https://api.coingecko.com/api/v3/simple/price?ids=${chains.join(',')}&vs_currencies=usd`);
            console.log('API response:', response.data);
            let result = {
                ethereum: null,
                polygon: null,
            };
            for (const chain of chains) {
                const price = response.data[chain]?.usd;
                if (price) {
                    const timestamp = new Date();
                    console.log(`[${timestamp.toISOString()}] ${chain}: $${price}`);
                    const lastPriceData = this.prices.find((data) => data.chain === chain && this.isWithinOneHour(data.timestamp, timestamp));
                    if (lastPriceData) {
                        const priceDifference = (price - lastPriceData.price) / lastPriceData.price;
                        if (priceDifference > 0.03) {
                            if (this.priceAlerts[chain]) {
                                await this.sendEmailNotification(chain, price, lastPriceData.price);
                            }
                        }
                    }
                    this.prices.push({ chain, price, timestamp });
                    if (chain === 'ethereum') {
                        result.ethereum = price;
                    }
                    else if (chain === 'matic-network') {
                        result.polygon = price;
                    }
                }
                else {
                    console.log(`No price data found for ${chain}`);
                }
            }
            return result;
        }
        catch (error) {
            console.error('Error fetching prices:', error.message);
            return { ethereum: null, polygon: null };
        }
    }
    setPriceAlert(chain, alert) {
        this.priceAlerts[chain] = alert;
        console.log(`Price alert for ${chain} set to ${alert}`);
    }
    isWithinOneHour(lastTimestamp, currentTimestamp) {
        const oneHourInMillis = 60 * 60 * 1000;
        return currentTimestamp.getTime() - lastTimestamp.getTime() <= oneHourInMillis;
    }
    async sendEmailNotification(chain, newPrice, oldPrice) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lodhihasnainhaider@gmail.com',
                pass: 'pgkb wbwh wevj hino',
            },
        });
        const mailOptions = {
            from: 'lodhihasnainhaider@gmail.com',
            to: 'lodhihasnainhaider@gmail.com',
            subject: `Price Alert: ${chain} Increased by More Than 3%`,
            text: `The price of ${chain} has increased by more than 3%!\n\nOld Price: $${oldPrice}\nNew Price: $${newPrice}\n\nPlease take the necessary action.`,
        };
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent for ${chain} price increase.`);
        }
        catch (error) {
            console.error('Error sending email:', error);
        }
    }
};
exports.DummyService = DummyService;
__decorate([
    (0, schedule_1.Cron)('*/5 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DummyService.prototype, "fetchAndSavePrices", null);
exports.DummyService = DummyService = __decorate([
    (0, common_1.Injectable)()
], DummyService);
class SwapService {
    async getSwapRate(ethAmount) {
        try {
            const response = await axios_1.default.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd');
            const ethToUsd = response.data.ethereum.usd;
            const btcToUsd = response.data.bitcoin.usd;
            const ethToBtc = response.data.ethereum.usd / response.data.bitcoin.usd;
            const btcAmount = ethAmount * ethToBtc;
            const feePercentage = 0.03;
            const feeInEth = ethAmount * feePercentage;
            const feeInUsd = feeInEth * ethToUsd;
            return {
                btcAmount,
                feeInEth,
                feeInUsd,
                feePercentage,
            };
        }
        catch (error) {
            console.error('Error fetching swap rate:', error.message);
            throw new Error('Error fetching swap rate');
        }
    }
}
exports.SwapService = SwapService;
//# sourceMappingURL=dummy.service.js.map