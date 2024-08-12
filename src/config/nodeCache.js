const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 3600 }); //TTL of 1hr

module.exports = cache;
