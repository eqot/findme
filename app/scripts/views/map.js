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
        location: null,
        nickname: $.cookie('nickname') || '',

        template: _.template(NicknameTemplate),

        ICON_BASE_URI: 'http://maps.google.co.jp/mapfiles/ms/icons/',
        ICONS: [
            'red-dot.png',
            'blue-dot.png',
            'green-dot.png',
            'ltblue-dot.png',
            'yellow-dot.png',
            'purple-dot.png',
            'pink-dot.png',
            'orange-dot.png'
        ],

        initialize: function (model, id) {
            // console.log('MapView');

            _.bindAll(this, 'onRecived');

            this.mapId = id;

            this.location = new Location();
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
/*
            this.marker = new google.maps.Marker({
                position: this.location.getLatLng(),
                map: this.map,
                title: this.nickname
            });
*/
            this.$el.append(this.template());
            $('#nickname').val(this.nickname);
        },

        onChanged: function () {
            console.log('onChanged');

            var latlng = this.location.getLatLng();
            this.map.setCenter(latlng);
            // this.marker.setPosition(latlng);

            pubsub.publish(this.mapId, {
                nickname: this.nickname,
                lat: this.location.get('lat'),
                lng: this.location.get('lng')
            });
        },

        onRecived: function (data) {
            console.log(data);

            var marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(data.lat, data.lng),
                title: data.nickname,
                icon: this.getIcon(data._index)
            });
        },

        getIcon: function (index) {
            return this.ICON_BASE_URI + this.ICONS[index % 7];
        },

        updateNickname: function () {
            // console.log($('#nickname').val());

            this.nickname = $('#nickname').val();
            $.cookie('nickname', this.nickname);
        }
    });

    return MapView;
});
