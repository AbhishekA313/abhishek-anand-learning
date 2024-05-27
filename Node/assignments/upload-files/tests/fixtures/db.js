const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Abhishek',
    email: 'test1@test.com',
    password: 'Test@123',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Abhishek Anand',
    email: 'abhishek@test.com',
    password: 'Abhi@1003',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
};

const setupDatabase = async () => {
    await User.deleteMany();

    await new User(userOne).save();
    await new User(userTwo).save();
}

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    setupDatabase
}