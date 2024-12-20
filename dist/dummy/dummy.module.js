"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyModule = void 0;
const common_1 = require("@nestjs/common");
const dummy_controller_1 = require("./dummy.controller");
const dummy_service_1 = require("./dummy.service");
let DummyModule = class DummyModule {
};
exports.DummyModule = DummyModule;
exports.DummyModule = DummyModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [dummy_controller_1.DummyController, dummy_controller_1.SwapController],
        providers: [dummy_service_1.DummyService, dummy_service_1.SwapService],
    })
], DummyModule);
//# sourceMappingURL=dummy.module.js.map