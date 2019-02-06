import Vue from 'vue';
import _ from 'underscore';

const template = require('./base-widget.html');

const BaseWidget = Vue.extend({
   name: 'BaseWidget',
   template: template,

   props: {
      id: String,
      title: String,
      size: Object,
      data: Object,
   },

   computed: {
      classes: function(): object {
         const classes: { [index: string]: boolean } = {};

         classes['w' + this.size.width] = true;
         classes['h' + this.size.height] = true;
         classes.loading = this.isLoading;

         return classes;
      },
      isLoading: function() {
         return _.isEmpty(this.data);
      },
   },

});

export default BaseWidget;
