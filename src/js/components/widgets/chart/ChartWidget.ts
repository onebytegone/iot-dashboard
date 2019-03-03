import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import Chart from 'chart.js';
import _ from 'underscore';
import WidgetMixin from '../WidgetMixin';
import template from './chart-widget.html';

@Component({
   name: 'Chart',
   template: template,
})
export default class ChartWidget extends Mixins(WidgetMixin) {

   @Prop(Object) public dataSource?: { fetch: () => Promise<ChartWidgetData> }
   @Prop({ default: 'line' }) public type!: ChartType

   public fetchedData: ChartWidgetData = {}

   private _chart?: Chart = undefined

   public mounted(): void {
      const chartWrapper = this.$el.querySelector('.chart-wrapper'),
            canvas = document.createElement('canvas');

      if (chartWrapper) {
         chartWrapper.append(canvas);
      }

      // TODO: make this more configurable
      this._chart = new Chart(canvas, {
         type: this.type,
         options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
               duration: 0,
            },
            legend: {
               position: 'bottom',
               labels: {
                  fontColor: '#dedede',
                  fontFamily: 'Ubuntu, sans-serif',
               },
            },
            scales: {
               xAxes: [
                  {
                     type: 'time',
                     gridLines: {
                        color: '#5f6877',
                     },
                     ticks: {
                        fontColor: '#bbbbbb',
                        fontFamily: 'Ubuntu, sans-serif',
                     },
                  },
               ],
               yAxes: [
                  {
                     gridLines: {
                        color: '#5f6877',
                     },
                     ticks: {
                        fontColor: '#bbbbbb',
                        fontFamily: 'Ubuntu, sans-serif',
                     },
                  },
               ],
            },
         },
      });
   }

   @Watch('fetchedData')
   protected _onDataChange(): void {
      if (!this._chart || !this.fetchedData.chartDatasets) {
         return;
      }

      const colors = [
         '#19aee0',
         '#00bdd0',
         '#00c6a4',
         '#5fc96a',
         '#b2c32f',
         '#ffb01c',
      ];

      const datasets = _.chain(this.fetchedData.chartDatasets)
         .map((dataset): Chart.ChartDataSets => {
            const color = dataset.color || colors.pop() || '#aaaaaa';

            return {
               label: dataset.label,
               data: dataset.points,
               borderColor: color,
               backgroundColor: color,
               fill: false,
               cubicInterpolationMode: 'monotone',
            };
         })
         .value();

      this._chart.data = {
         // `labels: []` is needed until a release with the following commit is cut.
         // https://github.com/chartjs/Chart.js/commit/87e44fa360be580dae085d85d74614dfdc3988c5
         labels: [],
         datasets: datasets,
      };
      this._chart.update();
   }

}
