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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
const MovieService_1 = __importDefault(require("../services/MovieService"));
const express_1 = require("express");
const inversify_express_utils_1 = require("inversify-express-utils");
const GoogleSheetService_1 = __importDefault(require("../services/GoogleSheetService"));
let MoviesController = class MoviesController {
    constructor(_movieService, _googleSheetService) {
        this._movieService = _movieService;
        this._googleSheetService = _googleSheetService;
    }
    getFilms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.search) {
                throw new Error('there are nothing to search');
            }
            const result = yield this._movieService.getMovies(req.query.search);
            res.send(result);
        });
    }
    getFastAndFuriousFilms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._movieService.getMoviesFastFurious();
            console.log(result);
            res.send(result);
        });
    }
    getPiratesoftheCaribbeanFilms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._googleSheetService.generateSheetUrl();
            console.log(result);
            res.send(result);
        });
    }
    successfully_Install_Sheet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.code) {
                throw new Error('code invalid');
            }
            console.log(req.query.code);
            this._googleSheetService.manageSheet(req.query.code);
            res.send('Authentication successful! Please return to the console.');
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/getlist'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MoviesController.prototype, "getFilms", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/films'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], MoviesController.prototype, "getFastAndFuriousFilms", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/generateUrl'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], MoviesController.prototype, "getPiratesoftheCaribbeanFilms", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/install'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _k : Object, typeof (_l = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], MoviesController.prototype, "successfully_Install_Sheet", null);
MoviesController = __decorate([
    (0, inversify_express_utils_1.controller)('/movies'),
    __metadata("design:paramtypes", [MovieService_1.default,
        GoogleSheetService_1.default])
], MoviesController);
exports.default = MoviesController;
