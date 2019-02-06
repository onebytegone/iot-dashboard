import { sprintf } from 'sprintf-js';
import BaseWidget from '../base-widget/BaseWidget';

const template = require('./value-widget.html');

const ValueWidget = BaseWidget.extend({
   name: 'Value',
   template: template,

   props: {
      format: {
         type: String,
         default: '%s',
      },
      placeholder: {
         type: String,
         default: 'n/a',
      },
   },

   computed: {
      formattedValue: function(): string {
         if (!this.data.value) {
            return '';
         }

         return sprintf(this.format, this.data.value);
      },
   },
});

export default ValueWidget;
