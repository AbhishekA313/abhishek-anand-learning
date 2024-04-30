require('../src/db/mongoose');

const Task = require('../src/models/task');

// Task.findByIdAndDelete('662fabce8dcdce89320d3ebe').then((task) => {
//     console.log(task);

//     return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e)
// })

const deleteAgeAndCount = async (id, age) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });

    return count;
}

deleteAgeAndCount('662f8b4e75f8526e184811c8').then(count => {
    console.log(count);
}).catch(e => {
    console.log('Error: ', e);
});