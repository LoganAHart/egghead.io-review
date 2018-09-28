const fs = require('fs');
const inputFile = './users.json';
const outputFile = './output.json';

const readable = fs.createReadStream(inputFile);
const writeable = fs.createWriteStream(outputFile);

readable.pipe(writeable);

