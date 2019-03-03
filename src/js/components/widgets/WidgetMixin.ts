import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'underscore';

// NOTE: See the linked comment [1] for details as to the @ts-ignore and export oddness
// in this file.
// [1]: https://github.com/vuejs/vue-class-component/issues/91#issuecomment-451422547

// @ts-ignore
@Component
abstract class WidgetMixinAbstract extends Vue {

   @Prop(String) public id!: string
   @Prop(String) public title!: string
   @Prop(Object) public layout!: WidgetLayout
   @Prop(Object) public abstract dataSource?: { fetch: () => Promise<object> }

   public abstract fetchedData: object = {}

   public get classes(): object {
      const classes: { [index: string]: boolean } = {};

      _.each(this.layout, (size, key) => {
         const suffix = (key === 'default' ? '' : `-${key}`);

         if (size) {
            classes[`w${size.width}${suffix}`] = true;
            classes[`h${size.height}${suffix}`] = true;
         }
      });

      classes.loading = this.isLoading;

      return classes;
   }

   public get isLoading(): boolean {
      return _.isEmpty(this.fetchedData);
   }

   public mounted(): void {
      // TODO: Add auto refresh capability

      if (this.dataSource) {
         this.dataSource.fetch()
            .then((data) => {
               this.fetchedData = data;
            });
      }
   }
}

@Component({})
// @ts-ignore
export default class WidgetMixin extends WidgetMixinAbstract { }
