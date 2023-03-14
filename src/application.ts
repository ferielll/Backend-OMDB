import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';
import IApplication from './interfaces/IApplication';
import MoviesController from './controllers/MoviesController';
import MovieService from './services/MovieService';
import GoogleSheetService from './services/GoogleSheetService';



export default class Application extends IApplication {
  //* * */
  async setup() {
    const server = new InversifyExpressServer(this._container);

    server.setConfig((app) => {
      // app.use('/slack', boltReceiver.router);
      app.use(express.json());
      app.use(cors());
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
  }

  configureService(): void {
    // db stuff
    this._container.bind(MoviesController).toSelf();
    this._container.bind(MovieService).toSelf();
    this._container.bind(GoogleSheetService).toSelf();
  }
}
