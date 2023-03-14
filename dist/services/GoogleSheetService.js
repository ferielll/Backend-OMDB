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
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const inversify_1 = require("inversify");
const google_spreadsheet_1 = require("google-spreadsheet");
const MovieService_1 = __importDefault(require("./MovieService"));
let GoogleSheetService = class GoogleSheetService {
    constructor(_movieService) {
        this._movieService = _movieService;
        this._oAuth2Client = new google_auth_library_1.OAuth2Client({
            // clientId: process.env.GOOGLE_CLIENT_ID,
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // redirectUri: process.env.GOOGLE_SHEET_REDIRECT_URL,
            clientId: "666936397581-mud9c53a0ua7c9ob9u1qkq6qel7d81er.apps.googleusercontent.com",
            clientSecret: "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",
            redirectUri: "http://localhost:5000/movies/install",
        });
    }
    //Authorize
    generateSheetUrl() {
        return this._oAuth2Client.generateAuthUrl({
            scope: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/drive.appdata',
            ],
            access_type: 'offline',
        });
    }
    manageSheet(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._oAuth2Client.getToken(code);
            if (!response) {
                throw new Error(`installation not completed`);
            }
            const credentials = {
                refresh_token: response.tokens.refresh_token,
                access_token: response.tokens.access_token,
                expiry_date: response.tokens.expiry_date,
            };
            yield this._oAuth2Client.setCredentials(credentials);
            const spreadsheetId = yield this.createSpreadSheet();
            yield this.addRows(spreadsheetId, credentials);
            return console.log(response.tokens);
        });
    }
    createSpreadSheet() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = new google_spreadsheet_1.GoogleSpreadsheet();
                doc.useOAuth2Client(this._oAuth2Client);
                yield doc.createNewSpreadsheetDocument({
                    title: "List of Pirates of caribean",
                });
                const sheet = doc.sheetsByIndex[0];
                yield sheet.updateProperties({
                    title: "exemple",
                });
                yield sheet.setHeaderRow([
                    'title',
                    'year',
                    'director', 'image', 'before_2015', 'paul_walker', 'communActors_starWars'
                ]);
                return doc.spreadsheetId;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    addRows(spreadsheetId, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._oAuth2Client.setCredentials(credentials);
                const doc = new google_spreadsheet_1.GoogleSpreadsheet(spreadsheetId);
                yield doc.useOAuth2Client(this._oAuth2Client);
                yield doc.loadInfo();
                //Fetch data then add rows
                const result = yield this._movieService.getMovies("Pirates of the Caribbean");
                console.log(result);
                doc.sheetsByIndex[0].addRows(this.pirateOfCaribeanContent(result));
                console.log("ok");
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    pirateOfCaribeanContent(data) {
        let newArr = [];
        console.log(data);
        data.forEach((element) => {
            newArr.push({
                [`title`]: element.title,
                [`year`]: element.year,
                [`director`]: element.director,
                [`image`]: element.image,
                before_2015: element.before_2015,
                paul_walker: element.paul_walker,
                communActors_starWars: element.communActors_starWars
            });
        });
        console.log("pirate");
        return newArr;
    }
    ;
};
GoogleSheetService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [MovieService_1.default])
], GoogleSheetService);
exports.default = GoogleSheetService;
