/*global define */
define([
    'jquery',
    'backbone',
    'underscore',
    'http://localhost:9001/pubsub/client.js'
], function ($, Backbone, _) {
    'use strict';

    var MapView = Backbone.View.extend({
        el: $('#view'),

        id: null,

        initialize: function (model, id) {
            // console.log('MapView');

            this.id = id;

            var that = this;
            pubsub.connect(function () {
                pubsub.subscribe(that.id, that.onRecived);

                pubsub.publish(that.id, 'test');
            });
        },

        onRecived: function (data) {
            console.log(data);
        }
    });

    return MapView;
});
