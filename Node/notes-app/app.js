/**
 * importing core modules
 */
const fs = require('fs');

fs.writeFileSync('notes.txt', 'My name is Abhishek Anand');
fs.appendFileSync('notes.txt', ' and currently working on Node JS.');

/**
 * importing your own files
 */
const firstName = require('./utils');
console.log(firstName);

/**
 * importing node modules
 */
const validator = require('validator');

console.log(validator.isEmail('abhishek@gmail.com'));
console.log(validator.isURL('google.com'));

/**
 * text printing in color
 */

const chalk = require('chalk');
const greenMsg = chalk.bold.green('Anand');
console.log(`Abhishek ${greenMsg}`);