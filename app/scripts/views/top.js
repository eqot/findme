/*global define */
define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/top.html'
], function ($, Backbone, _, TopViewTemplate) {
    'use strict';

    var TopView = Backbone.View.extend({
        el: $('#view'),

        events: {
            'click #create': 'createMap'
        },

        template: _.template(TopViewTemplate),

        initialize: function () {
            // console.log('TopView');

            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        },

        createMap: function () {
            console.log('ok');
        }
    });

    return TopView;
});
