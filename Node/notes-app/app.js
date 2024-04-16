/**
 * importing core modules
 */
// const fs = require('fs');

// fs.writeFileSync('notes.txt', 'My name is Abhishek Anand');
// fs.appendFileSync('notes.txt', ' and currently working on Node JS.');

/**
 * importing your own files
 */
// const firstName = require('./utils');
// console.log(firstName);

/**
 * importing node modules
 */
// const validator = require('validator');

// console.log(validator.isEmail('abhishek@gmail.com'));
// console.log(validator.isURL('google.com'));

/**
 * text printing in color
 */

// const chalk = require('chalk');
// const greenMsg = chalk.bold.green('Anand');
// console.log(`Abhishek ${greenMsg}`);

/**
 * argument passing with yargs
 */
// const yargs = require('yargs');
// const command = process.argv[2];

// yargs.version('1.1.0'); // we can change yargs version

// yargs.command({
//     command: 'add',
//     describe: 'Add a new note',
//     builder: {
//         title: {
//             describe: 'Note title',
//             demandOption: true,
//             type: 'string'
//         },
//         body: {
//             describe: 'Note body',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler: function (argv) {
//         console.log(`Title: ${argv.title}`);
//         console.log(`Body: ${argv.body}`);
//     }
// })

// yargs.command({
//     command: 'remove',
//     describe: 'Remove a new note',
//     handler: function () {
//         console.log('Removing a new note!');
//     }
// })

// yargs.parse();

// console.log(process.argv);

// if (command === 'add') {
//     console.log('Adding note!');
// } else {
//     console.log('Removing note!');
// }

/**
 * Adding a note
 */
const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
})

/**
 * Removing a note
 */
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes();
    }
})

yargs.command({
    command: 'read',
    describe: 'Read notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNotes(argv.title);
    }
})

yargs.parse();