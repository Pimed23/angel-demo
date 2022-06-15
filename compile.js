const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'src/contracts', 'Angel.sol');
const source = fs.readFileSync(contractPath, 'utf-8');
//console.log(solc.compile(source, 1));
module.exports = solc.compile(source, 1).contracts[':Monitor'];

