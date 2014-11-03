'use strict';

var express = require('express'),
    favicon = require('static-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./config'),
    busboy = require('connect-busboy'),
    mongoStore = require('connect-mongo')(session);

/**
 * Express configuration
 */
module.exports = function (app) {
    var env = app.get('env');

    console.log("env => " + env);

    if ('development' === env) {
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/scripts/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

        app.use(express.static(path.join(__dirname, '/../public')));

        app.set('views', __dirname + '/../public/views');
    }

    if ('production' === env) {
        app.use(express.static(path.join(__dirname, '/../public')));
        app.set('views', __dirname + '/../public/views');
    }

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(morgan('dev'));
    app.use(busboy());
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());

    // Persist sessions with mongoStore
    app.use(session({
        secret: 'angular-fullstack secret',
        store: new mongoStore({
            url: config.mongo.uri,
            collection: 'sessions'
        }, function () {
            console.log('db connection open');
        })
    }));


    // Error handler - has to be last
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
};