import { Credentials, OAuth2Client } from 'google-auth-library';
import { injectable } from 'inversify';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import MovieService, { IMovie } from './MovieService';

type TypeResponseContent = {
    [header: string]: string | number | boolean;
};

@injectable()
export default class GoogleSheetService {
    readonly _oAuth2Client = new OAuth2Client({
        // clientId: process.env.GOOGLE_CLIENT_ID,
        // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // redirectUri: process.env.GOOGLE_SHEET_REDIRECT_URL,

        clientId: "666936397581-mud9c53a0ua7c9ob9u1qkq6qel7d81er.apps.googleusercontent.com",
        clientSecret: "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",
        redirectUri: "http://localhost:5000/movies/install",
    });
    constructor(private readonly _movieService: MovieService) { }

    //Authorize
    generateSheetUrl(): string {
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

    async manageSheet(code: string): Promise<any> {
        const response = await this._oAuth2Client.getToken(code);
        if (!response) {
            throw new Error(`installation not completed`);
        }
        const credentials: Credentials = {
            refresh_token: response.tokens.refresh_token,
            access_token: response.tokens.access_token,
            expiry_date: response.tokens.expiry_date,
        };
        await this._oAuth2Client.setCredentials(credentials);
        const spreadsheetId = await this.createSpreadSheet();
        await this.addRows(spreadsheetId,credentials);
        return console.log(response.tokens);
    }

    async createSpreadSheet(): Promise<string> {
        try {
            const doc = new GoogleSpreadsheet();
            doc.useOAuth2Client(this._oAuth2Client);
            await doc.createNewSpreadsheetDocument({
                title: "List of Pirates of caribean",
            });
            const sheet = doc.sheetsByIndex[0];

            await sheet.updateProperties({
                title: "exemple",
            });
            await sheet.setHeaderRow([
                'title',
                'year',
                'director', 'image', 'before_2015', 'paul_walker' , 'communActors_starWars'
            ]);
            return doc.spreadsheetId;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async addRows(spreadsheetId: string,credentials: Credentials): Promise<void> {
        try {
            await this._oAuth2Client.setCredentials(credentials);
            const doc = new GoogleSpreadsheet(spreadsheetId);
            await doc.useOAuth2Client(this._oAuth2Client);
            await doc.loadInfo();
            //Fetch data then add rows
            const result = await this._movieService.getMovies("Pirates of the Caribbean");
            console.log(result)
            doc.sheetsByIndex[0].addRows(this.pirateOfCaribeanContent(result as IMovie[]));
            console.log("ok")
        } catch (error) {
            console.log(error)
        }
    }

    
    pirateOfCaribeanContent(data: IMovie[] ): TypeResponseContent[]{
        let newArr: TypeResponseContent[] = [];
        console.log(data);
        data.forEach((element: any) => {
            newArr.push({
                [`title`]: element.title,
                [`year`]: element.year,
                [`director`]: element.director,
                [`image`]: element.image,
                before_2015: element.before_2015,
                paul_walker: element.paul_walker,
                communActors_starWars: element.communActors_starWars
            });
        })
        console.log("pirate");
        return newArr;
    };
}

