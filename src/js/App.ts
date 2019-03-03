import { Vue, Component } from 'vue-property-decorator';
import Dashboard from './components/dashboard/Dashboard';
import dashboardConfig from './dashboardConfig';

@Component({
   name: 'App',
   components: {
      Dashboard: Dashboard,
   },
   template: '<dashboard :configProvider="dashboardConfigProvider"></dashboard>',
})
export default class App extends Vue {

   public dashboardConfigProvider: object = {
      getConfig: (): Promise<DashboardConfig> => {
         return this._loadDashboardConfig();
      },
   }

   private _gettingConfig?: Promise<DashboardConfig> = undefined;

   public created(): void {
      this._loadDashboardConfig();
   }

   private _loadDashboardConfig(): Promise<DashboardConfig> {
      if (!this._gettingConfig) {
         // TODO: fetch dashboard config from actual data source
         this._gettingConfig = Promise.resolve(dashboardConfig);
      }

      return this._gettingConfig;
   }

}
