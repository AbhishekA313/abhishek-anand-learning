const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...';
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title,
            body
        });

        saveNotes(notes);
        console.log(chalk.green.inverse('New note added!'));
    } else {
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const removeNote = function (title) {
    const notes = loadNotes();

    const notesToKeep = notes.filter(function (note) {
        return note.title !== title;
    });

    saveNotes(notesToKeep);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'));
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.inverse('Your notes'));
    notes.forEach(note => console.log(chalk.green.inverse(note.title)))
}

const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if (note) {
        console.log(chalk.green.inverse(note.title));
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNotes
};