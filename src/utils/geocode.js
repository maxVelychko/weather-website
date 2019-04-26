const request = require('request');

const access_token = 'pk.eyJ1IjoibWFrc3ltdmVsIiwiYSI6ImNqdXR6cnp5aDBhMHg0YW40M2hpcWRneHoifQ.Iuw61HpvYhA7VqGXqbWsIg';

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=${access_token}&limit=1`;

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapbox service!');
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.');
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = geocode;