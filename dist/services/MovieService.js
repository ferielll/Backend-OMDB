"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const axios_1 = __importDefault(require("axios"));
const inversify_1 = require("inversify");
let MovieService = class MovieService {
    getMoviesFastFurious() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield axios_1.default.get(`https://www.omdbapi.com/?s=Fast&Furious&apikey=75ba8077`);
                if (!movies.data)
                    return console.log(movies.data.Error);
                const data = [];
                for (let i = 0; i < movies.data.Search.length; i++) {
                    const movie = movies.data.Search[i];
                    const element = yield this.getDetailMovie(movie.Year, movie.Title);
                    if (element.Title) {
                        data.push({
                            title: element === null || element === void 0 ? void 0 : element.Title,
                            year: element.Year,
                            director: element.Director,
                            image: element.Poster,
                        });
                    }
                }
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getMovies(search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const movies = yield axios_1.default.get(`https://www.omdbapi.com/?s=${search}&apikey=75ba8077`);
                // fetch star wars movies
                const starWarsMovies = yield axios_1.default.get(`https://www.omdbapi.com/?s=Atonement&apikey=75ba8077`);
                if (!movies.data || !starWarsMovies.data)
                    return console.log(movies.data.Error);
                const data = [];
                let actors = [];
                for (let i = 0; i < movies.data.Search.length; i++) {
                    const movie = movies.data.Search[i];
                    const element = yield this.getDetailMovie(movie.Year, movie.Title);
                    //pirates actors
                    const paul_Walker = element.Actors ? element.Actors.indexOf('Paul Walker') !== -1 ? true : false : false;
                    const actor = element.Actors ? element.Actors.split(', ') : "";
                    actors.push(...actor);
                    const commonActors = yield this.commonActors(starWarsMovies, actors);
                    console.log(commonActors, "commonActors");
                    if (element.Title) {
                        data.push({
                            title: element === null || element === void 0 ? void 0 : element.Title,
                            year: element.Year,
                            director: element.Director,
                            image: element.Poster,
                            before_2015: element.Year < 2015 ? true : false,
                            paul_walker: paul_Walker,
                            communActors_starWars: commonActors ? commonActors : "no actor is in common"
                        });
                    }
                }
                return data;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getDetailMovie(year, title) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield axios_1.default.get(`http://www.omdbapi.com/?t=${title}&y=${year}&apikey=75ba8077`);
            if (!result.data)
                console.log("not ok");
            return result.data;
        });
    }
    commonActors(starWarsData, piratesActors) {
        return __awaiter(this, void 0, void 0, function* () {
            let actors = [];
            for (let i = 0; i < starWarsData.data.Search.length; i++) {
                const movie = starWarsData.data.Search[i];
                const element = yield this.getDetailMovie(movie.Year, movie.Title);
                const actor = element.Actors ? element.Actors.split(', ') : "";
                actors.push(...actor);
            }
            return this.getCommonStrings(actors, piratesActors);
        });
    }
    getCommonStrings(array1, array2) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = array2.filter((x) => array1.includes(x));
            const Actors = Array.from(new Set(result));
            const resultToString = Actors.join(', ');
            return resultToString;
        });
    }
};
MovieService = __decorate([
    (0, inversify_1.injectable)()
], MovieService);
exports.default = MovieService;
