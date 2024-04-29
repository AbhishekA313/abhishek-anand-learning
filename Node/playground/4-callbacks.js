setTimeout(() => {
    console.log('Two seconds are up!');
}, 2000)

const names = ['Abhishek', 'Anand'];

const shortNames = names.filter(name => {
    return name.length <= 5;
});

const weatherApp = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
    
        callback(data);
    }, 2000);
}

weatherApp('Noida', (data) => {
    console.log(data);
})

const add = (a, b, callback) => {
    callback(a + b);
}

add(1, 4, (sum) => {
    console.log(sum);
})

const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is my error', undefined);
        callback(undefined, [1, 2, 3]);
    }, 2000);
}

doWorkCallback((error, result) => {
    if (error) {
        return console.log(error);
    }

    console.log(result);
});