const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());
const database = require('./models/index')
//Connect to mongodb
console.log(new Date())
// const path = require('path');
// const rateLimit = require("express-rate-limit");
// require('./controllers/authController');

app.use ((req, res, next) => {
    res.locals.url = req.originalUrl;
    res.locals.host = req.get('host');
    res.locals.protocol = req.protocol;
    next();
});
app.use(logger('dev'));
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ limit: '20mb', extended: false }));
app.use(cookieParser());
//auth
// const apiLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 15 minutes
//   max: 100,
// });
// app.use("/api/v1/public/auth", apiLimiter);

app.use('/v1', require('./routes'));

database.sequelize.sync({force:false})
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    if(res.locals){
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    }
    // render the error page
    res.status(500).json({
        message: err.message,
        error: err
    });
});

module.exports = app;
