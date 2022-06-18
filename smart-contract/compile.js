const path = require("path");
const fs = require("fs");
const solc = require("solc");

const monitorPath = path.resolve(__dirname, "contracts", "Monitor.sol");
const source = fs.readFileSync(monitorPath, "utf8");

module.exports = solc.compile(source, 1).contracts[":Monitor"];
