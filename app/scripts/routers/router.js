/*global define */
define([
    'backbone',
    'views/top'
], function (Backbone, TopView) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            '': 'topView'
        },

        initialize: function () {
            // console.log('Router');
            Backbone.history.start();
        },

        topView: function () {
            // console.log('topView');

            new TopView();
        }
    });

    return Router;
});
