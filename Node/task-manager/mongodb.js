const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(database);

    /**
     * insert query
     */
    // db.collection('users').insertOne({
    //     name: 'Abhishek1 Anand1',
    //     age: 27
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Clean the house',
    //         completed: true
    //     },
    //     {
    //         description: 'Renew inspection',
    //         completed: false
    //     },
    //     {
    //         description: 'Pot plants',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks.');
    //     }

    //     console.log(result.ops);
    // });

    /**
     * select query
     */
    // db.collection('users').findOne({name: 'Jan'}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // })

    // db.collection('users').findOne({_id: new ObjectID('6629eac7f4ece82d402c2294')}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // })

    // db.collection('users').find({age: 27}).toArray((error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // });

    // db.collection('users').find({age: 27}).count((error, count) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(count);
    // });

    /**
     * update query
     */
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID('6629e946114d892b28ce81e7')
    // }, {
    //     $set: {
    //         name: 'Abhishek'
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // const updatePromise = db.collection('users').updateMany({
    //     name: 'Abhishek'
    // }, {
    //     $set: {
    //         name: 'Abhishek Anand'
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    /**
     * delete query
     */
    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection('users').deleteOne({
        _id: new ObjectID('6629eac7f4ece82d402c2294')
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
});