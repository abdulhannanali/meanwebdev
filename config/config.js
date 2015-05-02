var nodeEnvFile = ("./env/" + process.env.NODE_ENV + ".js");

module.exports = require(nodeEnvFile);
