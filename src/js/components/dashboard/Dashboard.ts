import Vue from 'vue';
import ChartWidget from '../widgets/chart/ChartWidget';
import ValueWidget from '../widgets/value/ValueWidget';

const template = require('./dashboard.html');

const Dashboard = Vue.extend({
   name: 'Dashboard',
   template: template,

   components: {
      Chart: ChartWidget,
      Value: ValueWidget,
   },

   data: function(): object {
      return {
         widgets: [
            {
               id: 'widget_one',
               widget: 'Chart',
               title: 'Graph',
               size: { width: 9, height: 8 },
               data: {},
            },
            {
               id: 'widget_two',
               widget: 'Value',
               size: { width: 3, height: 4 },
               data: {},
            },
            {
               id: 'widget_three',
               widget: 'Value',
               title: 'Other Value',
               size: { width: 3, height: 4 },
               data: {},
            },
         ],
      };
   },

   mounted: function() {
      this._requestAndUpdateChartData();
   },

   methods: {
      _requestAndUpdateChartData: function() {
         // TODO: pull from data source
         new Promise((resolve) => setTimeout(resolve, 3000))
            .then(() => {
               this.$data.widgets[0].data = {
                  chartDatasets: [
                     {
                        label: 'Temperature',
                        points: [
                           { x: new Date(2019, 2, 5, 12, 0, 0), y: 60 },
                           { x: new Date(2019, 2, 5, 13, 0, 0), y: 66 },
                           { x: new Date(2019, 2, 5, 14, 0, 0), y: 63 },
                           { x: new Date(2019, 2, 5, 15, 0, 0), y: 64 },
                           { x: new Date(2019, 2, 5, 16, 0, 0), y: 62 },
                           { x: new Date(2019, 2, 5, 17, 0, 0), y: 65 },
                        ],
                        color: '#f0f00f',
                     },
                  ],
               };
               this.$data.widgets[2].data = {
                  value: '42',
               };
            });
      },
   },
});

export default Dashboard;
