"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const cors_1 = __importDefault(require("cors"));
const IApplication_1 = __importDefault(require("./interfaces/IApplication"));
const MoviesController_1 = __importDefault(require("./controllers/MoviesController"));
const MovieService_1 = __importDefault(require("./services/MovieService"));
const GoogleSheetService_1 = __importDefault(require("./services/GoogleSheetService"));
class Application extends IApplication_1.default {
    //* * */
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = new inversify_express_utils_1.InversifyExpressServer(this._container);
            server.setConfig((app) => {
                // app.use('/slack', boltReceiver.router);
                app.use(express_1.default.json());
                app.use((0, cors_1.default)());
                app.use(function (req, res, next) {
                    // Request methods you wish to allow
                    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                    // Request headers you wish to allow
                    res.setHeader('Access-Control-Allow-Headers', '*');
                    // Set to true if you need the website to include cookies in the requests sent
                    // to the API (e.g. in case you use sessions)
                    res.setHeader('Access-Control-Allow-Credentials', 'true');
                    // Pass to next layer of middleware
                    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
                    next();
                });
            });
            const app = server.build();
            const port = 5000;
            app.listen(port, () => {
                console.log(`🚀 server is running on http://localhost:${port}`);
            });
        });
    }
    configureService() {
        // db stuff
        this._container.bind(MoviesController_1.default).toSelf();
        this._container.bind(MovieService_1.default).toSelf();
        this._container.bind(GoogleSheetService_1.default).toSelf();
    }
}
exports.default = Application;
