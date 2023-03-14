import axios from 'axios';
import { injectable } from 'inversify';

export interface IMovie {
    image: String;
    title: String;
    director: String;
    year: String;
    before_2015?: boolean;
    paul_walker?: boolean;
    communActors_starWars?: String;
}

export interface IMoviesFastFurious {
    image: String;
    title: String;
    director: String;
    year: String;
}

@injectable()
export default class MovieService {
    async getMoviesFastFurious(): Promise<IMoviesFastFurious[] | void> {
        try {
            const movies: any = await axios.get(`https://www.omdbapi.com/?s=Fast&Furious&apikey=75ba8077`);
            if (!movies.data)
                return console.log(movies.data.Error);
            const data: IMoviesFastFurious[] = [];
            for (let i = 0; i < movies.data.Search.length; i++) {
                const movie = movies.data.Search[i];
                const element = await this.getDetailMovie(movie.Year, movie.Title);
                if (element.Title) {
                    data.push({
                        title: element?.Title,
                        year: element.Year,
                        director: element.Director,
                        image: element.Poster,
                    })
                }
            }
            return data;
        } catch (err) {
            console.log(err)
        }
    }
    async getMovies(search: String): Promise<IMovie[] | void> {
        try {
            const movies: any = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=75ba8077`);
            // fetch star wars movies
            const starWarsMovies: any = await axios.get(`https://www.omdbapi.com/?s=Atonement&apikey=75ba8077`);
            if (!movies.data || !starWarsMovies.data)
                return console.log(movies.data.Error);
            const data: IMovie[] = [];
            let actors: string[] = [];
            for (let i = 0; i < movies.data.Search.length; i++) {
                const movie = movies.data.Search[i];
                const element = await this.getDetailMovie(movie.Year, movie.Title);
                //pirates actors
                const paul_Walker = element.Actors ? element.Actors.indexOf('Paul Walker') !== -1 ? true : false : false;
                const actor = element.Actors ? element.Actors.split(', ') : "";
                actors.push(...actor);
                const commonActors = await this.commonActors(starWarsMovies, actors);
                console.log(commonActors, "commonActors");
                if (element.Title) {
                    data.push({
                        title: element?.Title,
                        year: element.Year,
                        director: element.Director,
                        image: element.Poster,
                        before_2015: element.Year < 2015 ? true : false,
                        paul_walker: paul_Walker,
                        communActors_starWars: commonActors ? commonActors : "no actor is in common"
                    })
                }
            }
            return data;
        } catch (err) {
            console.log(err)
        }
    }

    async getDetailMovie(year: string, title: string) {
        const result = await axios.get(`http://www.omdbapi.com/?t=${title}&y=${year}&apikey=75ba8077`);
        if (!result.data)
            console.log("not ok");
        return result.data;
    }

    async commonActors(starWarsData: any, piratesActors: string[]) {
        let actors: string[] = [];
        for (let i = 0; i < starWarsData.data.Search.length; i++) {
            const movie = starWarsData.data.Search[i];
            const element = await this.getDetailMovie(movie.Year, movie.Title);
            const actor = element.Actors ? element.Actors.split(', ') : "";
            actors.push(...actor);
        }
        return this.getCommonStrings(actors, piratesActors);
    }

    async getCommonStrings(array1: string[], array2: string[]): Promise<string> {
        const result = array2.filter((x) => array1.includes(x));
        const Actors = Array.from(new Set(result));
        const resultToString = Actors.join(', ');
        return resultToString;
    }

}

