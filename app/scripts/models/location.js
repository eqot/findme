/*global define */
define([
    'jquery',
    'backbone',
    'underscore'
], function ($, Backbone, _) {
    'use strict';

    var Location = Backbone.Model.extend({
        defaults: {
            lat: 35.681382,
            lng: 139.766084
        },

        initialize: function () {
            // console.log('Location');

            var that = this;
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function (position) {
                    that.set({
                        'lat': position.coords.latitude,
                        'lng': position.coords.longitude
                    });
                });
            }
        },

        getLatLng: function () {
            return new google.maps.LatLng(this.get('lat'), this.get('lng'));
        }
    });

    return Location;
});
