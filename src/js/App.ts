import { Vue, Component } from 'vue-property-decorator';
import Dashboard from './components/dashboard/Dashboard';

@Component({
   name: 'App',
   components: {
      Dashboard: Dashboard,
   },
})
export default class App extends Vue {}
