/*global define, google */
define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Location = Backbone.Model.extend({
        defaults: {
            lat: parseFloat($.cookie('lat')) || 35.681382,
            lng: parseFloat($.cookie('lng')) || 139.766084
        },

        initialize: function () {
            // console.log('Location');

            var that = this;
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;

                    $.cookie('lat', lat);
                    $.cookie('lng', lng);

                    that.set({
                        'lat': lat,
                        'lng': lng
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
