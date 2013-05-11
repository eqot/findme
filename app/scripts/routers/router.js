/*global define */
define([
    'backbone',
    'views/top',
    'views/map'
], function (Backbone, TopView, MapView) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            '': 'topView',
            'map/:id': 'mapView'
        },

        initialize: function () {
            // console.log('Router');
            Backbone.history.start();
        },

        topView: function () {
            // console.log('topView');

            new TopView();
        },

        mapView: function (id) {
            new MapView(null, id);
        }
    });

    return Router;
});
