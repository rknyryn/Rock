const fetch = require('node-fetch');
const { rapidapi_key } = require('../config.json')

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

class API {
    async get_movieID(title) {
        return fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${title}&page=1&r=json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidapi_key,
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(result => { return result.Search[0] })
            .catch(err => { console.error(err); });
    }
    async get_movieDetails(id) {
        return fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${id}&r=json`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": rapidapi_key,
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(result => { return result })
            .catch(err => { console.error(err); });
    }

    async get_dogImage() {
        const result = await fetch("https://dog.ceo/api/breeds/image/random", requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));
        return result.message;
    }

    async get_catImage() {
        const result = await fetch("https://aws.random.cat/meow", requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));
        return result.file
    }

    async get_weather(city) {
        var specialRequestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {
                "x-rapidapi-key": rapidapi_key,
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
            }
        };

        const result = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, specialRequestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));
        return result;
    }

    async get_publicHoliday(countryCode, year) {
        const result = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${countryCode}`, requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error));

        return result;
    }
}

module.exports = { API };