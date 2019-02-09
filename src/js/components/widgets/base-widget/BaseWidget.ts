import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'underscore';
import template from './base-widget.html';

@Component({
   name: 'BaseWidget',
   template: template,
})
export default class BaseWidget extends Vue {

   @Prop(String) public id!: string
   @Prop(String) public title!: string
   @Prop(Object) public size!: { width: number; height: number }
   @Prop(Object) public data!: object

   public get classes(): object {
      const classes: { [index: string]: boolean } = {};

      classes['w' + this.size.width] = true;
      classes['h' + this.size.height] = true;
      classes.loading = this.isLoading;

      return classes;
   }

   public get isLoading(): boolean {
      return _.isEmpty(this.data);
   }

}
