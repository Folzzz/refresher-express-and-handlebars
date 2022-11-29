const moment = require('moment');

// custom middleware
const logger = (req, res, next) => {
    console.log(`This is a custom logger - ${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;