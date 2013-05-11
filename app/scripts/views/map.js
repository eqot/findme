/*global define, google, pubsub */
define([
    'jquery',
    'backbone',
    'underscore',
    'models/location',
    'text!templates/nickname.html',
    'jqueryCookie',
    'http://localhost:9001/pubsub/client.js',
    'async!http://maps.googleapis.com/maps/api/js?sensor=true'
], function ($, Backbone, _, Location, NicknameTemplate) {
    'use strict';

    var MapView = Backbone.View.extend({
        id: 'map',

        events: {
            'keydown #nickname': 'updateNickname'
        },

        map: null,
        mapId: null,
        location: null,

        template: _.template(NicknameTemplate),

        defaultMapOptions: {
            center: new google.maps.LatLng(35.681382, 139.766084), // Tokyo station
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },

        initialize: function (model, id) {
            // console.log('MapView');

            this.mapId = id;

            this.location = new Location();
            this.listenTo(this.location, 'change', this.onChanged);

            var that = this;
            pubsub.connect(function () {
                pubsub.subscribe(that.mapId, that.onRecived);

                pubsub.publish(that.mapId, 'test');
            });

            this.render();
        },

        render: function () {
            // this.$el.empty();
            $('#view').append(this.el);

            this.map = new google.maps.Map((this.$el)[0], this.defaultMapOptions);

            this.$el.append(this.template());
            $('#nickname').val($.cookie('nickname') || '');
        },

        onChanged: function () {
            console.log('onChanged');

            var pos = new google.maps.LatLng(
                this.location.get('lat'),
                this.location.get('lng'));
            this.map.setCenter(pos);
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
