import { Component, Prop, Mixins } from 'vue-property-decorator';
import { sprintf } from 'sprintf-js';
import WidgetMixin from '../WidgetMixin';
import template from './value-widget.html';

@Component({
   name: 'Value',
   template: template,
})
export default class ValueWidget extends Mixins(WidgetMixin) {

   @Prop(Object) public dataSource?: { fetch: () => Promise<ValueWidgetData> }
   @Prop({ default: '%s' }) public format!: string
   @Prop({ default: 'n/a' }) public placeholder!: string

   public fetchedData: ValueWidgetData = {}

   public get formattedValue(): string {
      if (!this.fetchedData.value) {
         return '';
      }

      return sprintf(this.format, this.fetchedData.value);
   }

}
