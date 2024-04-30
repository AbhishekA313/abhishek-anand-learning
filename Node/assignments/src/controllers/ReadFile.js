const fs = require('fs');

const readFile = async (req, res) => {
    try {
        /**
         * Reading file with sync method
         */
        const content1 = fs.readFileSync('./public/files/test2.txt', 'utf8');
        // fs.appendFileSync('./public/files/test1.txt', content1);

        /**
         * Reading file with async method
         */
        const content2 = await fs.promises.readFile('./public/files/test2.txt', 'utf8');
        console.log(content2);

        res.send('Reading file and updating!');
    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = readFile;