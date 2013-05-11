/*global define */
define([
    'jquery',
    'backbone',
    'underscore'
], function ($, Backbone, _) {
    'use strict';

    var Location = Backbone.Model.extend({
        defaults: {
            lat: null,
            lng: null,
        },

        initialize: function () {
            // console.log('Location');

            var that = this;
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function (position) {
                    that.set('lat', position.coords.latitude);
                    that.set('lng', position.coords.longitude);
                });
            }
        }
    });

    return Location;
});
