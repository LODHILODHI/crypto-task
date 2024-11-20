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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapController = exports.DummyController = void 0;
const common_1 = require("@nestjs/common");
const dummy_service_1 = require("./dummy.service");
let DummyController = class DummyController {
    constructor(dummyService) {
        this.dummyService = dummyService;
    }
    async getHello() {
        const result = await this.dummyService.fetchAndSavePrices();
        return result;
    }
    async getHello1() {
        const result = this.dummyService.setPriceAlert("ethereum", true);
        return result;
    }
};
exports.DummyController = DummyController;
__decorate([
    (0, common_1.Get)("fetchprice"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('set-alert'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "getHello1", null);
exports.DummyController = DummyController = __decorate([
    (0, common_1.Controller)('dummy'),
    __metadata("design:paramtypes", [dummy_service_1.DummyService])
], DummyController);
let SwapController = class SwapController {
    constructor(swapService) {
        this.swapService = swapService;
    }
    async getSwapRate(ethAmount) {
        if (!ethAmount || ethAmount <= 0) {
            return { error: 'Invalid Ethereum amount' };
        }
        const result = await this.swapService.getSwapRate(ethAmount);
        return result;
    }
};
exports.SwapController = SwapController;
__decorate([
    (0, common_1.Get)('rate'),
    __param(0, (0, common_1.Query)('ethAmount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SwapController.prototype, "getSwapRate", null);
exports.SwapController = SwapController = __decorate([
    (0, common_1.Controller)('swap'),
    __metadata("design:paramtypes", [dummy_service_1.SwapService])
], SwapController);
//# sourceMappingURL=dummy.controller.js.map