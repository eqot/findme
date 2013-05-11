/*global define */
define([
    'jquery',
    'backbone',
    'underscore'
], function ($, Backbone, _) {
    'use strict';

    var MapView = Backbone.View.extend({
        el: $('#view'),

        id: null,

        initialize: function (model, id) {
            // console.log('MapView');

            this.id = id;
        }
    });

    return MapView;
});
