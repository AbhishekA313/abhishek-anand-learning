const fs = require('fs');
const writeFile = (req, res) => {
    try {
        const content1 = "Learning Node.js!";
        const content2 = "\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        fs.writeFileSync('./public/files/test1.txt', content1);
        fs.writeFileSync('./public/files/test2.txt', content2);

        res.send('File has been created!');
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = writeFile;