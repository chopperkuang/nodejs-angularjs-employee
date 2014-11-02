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

    if ('development' === env) {
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/scripts/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

//        app.use(require('connect-livereload')());
        // Disable caching of scripts for easier testing

        app.use(express.static(path.join(__dirname, '/../public')));
        //app.use(express.static(path.join(__dirname, '.tmp')));
        //app.use(express.static(path.join(__dirname, 'items')));

        app.set('views', __dirname + '/../public/views');
    }

    if ('production' === env) {
        app.use(compression());
        app.use(favicon(path.join(config.root, 'app', 'favicon.ico')));
        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'app')));
        app.use(express.static(path.join(config.root, 'items')));
        app.set('views', __dirname + '/../server/views');
    }

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(morgan('dev'));
    app.use(busboy());
    app.use(bodyParser());
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