const fetch = require('node-fetch');
const getMapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN

exports.geocoding = async (value='', types=['place'], limit=1) => {
    let _value = value.replace(/_/g, '#')
    return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${_value.replace(/#/g,"")}.json?country=US&types=${encodeURIComponent(types)}&limit=${limit}&access_token=${getMapboxAccessToken}`).then(res => res.json())
    .then(json => json);;
}
