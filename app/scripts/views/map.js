/*global define */
define([
    'jquery',
    'backbone',
    'underscore',
    'http://localhost:9001/pubsub/client.js',
    'async!http://maps.googleapis.com/maps/api/js?sensor=true'
], function ($, Backbone, _) {
    'use strict';

    var MapView = Backbone.View.extend({
        el: $('#view'),

        id: null,

        map: null,

        defaultMapOptions: {
            center: new google.maps.LatLng(35.681382,139.766084), // Tokyo station
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },

        initialize: function (model, id) {
            // console.log('MapView');

            this.id = id;

            var that = this;
            pubsub.connect(function () {
                pubsub.subscribe(that.id, that.onRecived);

                pubsub.publish(that.id, 'test');
            });

            this.render();
        },

        render: function () {
            this.map = new google.maps.Map((this.$el)[0], this.defaultMapOptions);
        },

        onRecived: function (data) {
            console.log(data);
        }
    });

    return MapView;
});
