import Vue from 'vue';
import Dashboard from './components/dashboard/Dashboard';

const App = Vue.extend({
   name: 'App',

   components: {
      Dashboard: Dashboard,
   },

   methods: {
      doSomething(): string {
         return 'something';
      },
   },

});

export default App;
