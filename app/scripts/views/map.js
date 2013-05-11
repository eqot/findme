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

        mapId: null,
        map: null,
        marker: null,
        location: new Location(),
        // nickname: null,
        nickname: $.cookie('nickname') || '',

        template: _.template(NicknameTemplate),

        initialize: function (model, id) {
            // console.log('MapView');

            this.mapId = id;

            this.listenTo(this.location, 'change', this.onChanged);

            var that = this;
            pubsub.connect(function () {
                pubsub.subscribe(that.mapId, that.onRecived);

                that.onChanged();
            });

            this.render();
        },

        render: function () {
            $('#view').append(this.el);

            var defaultMapOptions = {
                center: this.location.getLatLng(),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map((this.$el)[0], defaultMapOptions);

            this.marker = new google.maps.Marker({
                position: this.location.getLatLng(),
                map: this.map,
                title: this.nickname
            });

            this.$el.append(this.template());
            $('#nickname').val(this.nickname);
        },

        onChanged: function () {
            console.log('onChanged');

            var latlng = this.location.getLatLng();
            this.map.setCenter(latlng);
            this.marker.setPosition(latlng);

            pubsub.publish(this.mapId, {
                nickname: this.nickname,
                latlng: latlng
            });
        },

        onRecived: function (data) {
            console.log(data);
        },

        updateNickname: function () {
            // console.log($('#nickname').val());

            this.nickname = $('#nickname').val();
            $.cookie('nickname', this.nickname);
        }
    });

    return MapView;
});
