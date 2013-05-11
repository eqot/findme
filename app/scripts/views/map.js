/*global define, google, pubsub */
define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/nickname.html',
    'jqueryCookie',
    'http://localhost:9001/pubsub/client.js',
    'async!http://maps.googleapis.com/maps/api/js?sensor=true'
], function ($, Backbone, _, NicknameTemplate) {
    'use strict';

    var MapView = Backbone.View.extend({
        el: $('#map'),

        events: {
            'keydown #nickname': 'updateNickname'
        },

        id: null,
        map: null,

        template: _.template(NicknameTemplate),

        defaultMapOptions: {
            center: new google.maps.LatLng(35.681382, 139.766084), // Tokyo station
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
            this.$el.empty();

            this.map = new google.maps.Map((this.$el)[0], this.defaultMapOptions);

            this.$el.append(this.template());
            $('#nickname').val($.cookie('nickname') || '');
        },

        onRecived: function (data) {
            console.log(data);
        },

        updateNickname: function () {
            // console.log($('#nickname').val());

            $.cookie('nickname', $('#nickname').val());
        }
    });

    return MapView;
});
