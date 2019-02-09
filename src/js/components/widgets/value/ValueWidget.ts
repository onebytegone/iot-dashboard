import { Component, Prop } from 'vue-property-decorator';
import { sprintf } from 'sprintf-js';
import BaseWidget from '../base-widget/BaseWidget';
import template from './value-widget.html';

@Component({
   name: 'Value',
   template: template,
})
export default class ValueWidget extends BaseWidget {

   @Prop({ default: '%s' }) public format!: string
   @Prop({ default: 'n/a' }) public placeholder!: string
   @Prop({ default: {} }) public data!: { value?: string }

   public get formattedValue(): string {
      if (!this.data.value) {
         return '';
      }

      return sprintf(this.format, this.data.value);
   }

}
