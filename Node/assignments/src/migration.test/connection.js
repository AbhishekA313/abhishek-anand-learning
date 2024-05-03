const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_exercise', 'abhishek', 'Test@123', {
    host: 'localhost',
    dialect: 'postgres'
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}