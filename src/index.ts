// // console.log('helloooo')


// const express = require('express');
// const request = require('request');
// const app = express();
// app.set('view engine', 'ejs');

// // @ts-ignore
// app.get('/', function(req: any, res: any){
//     res.render('search');
// });


// interface IFilms {
//     image: String ;
//     title: String;
//     director: String;
//     year: String;

// }

// // @ts-ignore
// app.get('/results', function(req: any, res: any){
//     var query = req.query.search;
//     var url = 'https://www.omdbapi.com/?s=' + query + '&apikey=75ba8077';
//     request(url, function(error: any, response: any, body: any){
//         if(!error && response.statusCode == 200){
//             var data = JSON.parse(body)
//             //res.send('results', {data: data});
//             console.log(JSON.stringify({data: data}))
//         }
//     });
// });

// // @ts-ignore

//  app.listen(3000, function(){
//      console.log('Movie app started on port: 3000');
//  });