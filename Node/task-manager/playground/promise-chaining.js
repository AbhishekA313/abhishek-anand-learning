require('../src/db/mongoose');

const User = require('../src/models/user');

// User.findByIdAndUpdate('662f8b4e75f8526e184811c7', {age: 30}).then((user) => {
//     console.log(user);

//     return User.countDocuments({ age: 30 });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });

    return count;
}

updateAgeAndCount('662f8b4e75f8526e184811c7', 28).then(count => {
    console.log(count);
}).catch(e => {
    console.log('Error: ', e);
});