const request = require('request');

const access_token = 'd18b9e4a0b3d8a388ec3c3216861c56c';

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${access_token}/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to darksky service!');
        } else if (body.error) {
            callback('Unable to find forecast. Please cheange coordinates');
        } else {
            callback(
                undefined, 
                `It's currently ${body.currently.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability}% chance of rain`
            );
        }
    });
}

module.exports = forecast;