/*global define */
define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/top.html',
    'text!templates/link.html'
], function ($, Backbone, _, TopViewTemplate, LinkTemplate) {
    'use strict';

    var TopView = Backbone.View.extend({
        el: $('#view'),

        events: {
            'click #create': 'createMap'
        },

        template: _.template(TopViewTemplate),
        linkTemplate: _.template(LinkTemplate),

        initialize: function () {
            // console.log('TopView');

            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },

        createMap: function () {
            var url = location.href + '#map/' + this.getMapId();
            // console.log(url);

            $('#link').html(this.linkTemplate({url: url}));
        },

        getMapId: function () {
            var id = 'xxxxxxxx'.replace(/x/g, function () {
                return Math.floor(Math.random() * 36).toString(36);
            });
            // console.log(id);

            return id;
        }
    });

    return TopView;
});
