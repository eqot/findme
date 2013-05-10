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

        template: _.template(TopViewTemplate),

        initialize: function () {
            // console.log('TopView');

            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }
    });

    return TopView;
});
