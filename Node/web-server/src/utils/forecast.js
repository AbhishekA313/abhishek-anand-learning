const request = require('request');

const forecast = (address) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${address}&appid=ded769e712686b856d2d109655146793`;

    return request({url, json: true}, (error, response) => {
        if (error) {
            console.log('Unable to connect to the weather service!');
        } else {
            console.log(response.body);
        }
    })
}

module.exports = {
    forecast
};