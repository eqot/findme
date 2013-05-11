require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        jqueryCookie: '../components/jquery.cookie/jquery.cookie',
        underscore: '../components/underscore/underscore-min',
        backbone: '../components/backbone/backbone-min',
        text: '../components/requirejs-text/text',
        async: '../components/requirejs-plugins/src/async',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'bootstrap'], function (app) {
    'use strict';

    app();
});
