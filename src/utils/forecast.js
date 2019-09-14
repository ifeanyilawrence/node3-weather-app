const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/162670359028f957da9618145033e7f2/' + latitude + ',' + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            console.log(body.daily.data);
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. Highest Temperature: ' + body.daily.data[0].temperatureHigh + ' degrees. Lowest temperature: ' + body.daily.data[0].temperatureLow + ' degrees');
        }
    });
};

module.exports = forecast;