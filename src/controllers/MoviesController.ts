import MovieService from "../services/MovieService";
import { Request, Response } from 'express';
import { controller, httpGet, requestParam, response, httpPut, requestBody } from 'inversify-express-utils';
import GoogleSheetService from "../services/GoogleSheetService";

@controller('/movies')
export default class MoviesController {
    constructor(
        private readonly _movieService: MovieService,
        private readonly _googleSheetService: GoogleSheetService
    ) { }

    @httpGet('/getlist')
    async getFilms(req: Request, res: Response): Promise<any> {
        if (!req.query.search) {
            throw new Error('there are nothing to search');
        }
        const result = await this._movieService.getMovies(req.query.search as string);
        res.send(result);
    }

    @httpGet('/films')
    async getFastAndFuriousFilms(req: Request, res: Response): Promise<any> {
        const result = await this._movieService.getMoviesFastFurious();
        console.log(result);
        res.send(result);
    }


    @httpGet('/generateUrl')
    async getPiratesoftheCaribbeanFilms(req: Request, res: Response): Promise<any> {
        const result = await this._googleSheetService.generateSheetUrl();
        console.log(result);
        res.send(result);
    }

    @httpGet('/install')
    async successfully_Install_Sheet(req: Request, res: Response): Promise<void> {
        if (!req.query.code) {
            throw new Error('code invalid');
        }
        console.log(req.query.code);
        this._googleSheetService.manageSheet(req.query.code as string)
        res.send('Authentication successful! Please return to the console.');
    }
}

