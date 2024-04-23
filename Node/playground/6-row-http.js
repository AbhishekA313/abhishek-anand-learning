const https = require('https');
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Noida&appid=ded769e712686b856d2d109655146793';

const request = https.request(url, (response) => {
    let data = '';

    response.on('data', chunk => {
        data = data + chunk.toString();
    })

    response.on('end', () => {
        const body = JSON.parse(data);
        console.log(body);
    })
});

request.on('error', (error) => {
    console.log(`Error: ${error}`);
})

request.end();