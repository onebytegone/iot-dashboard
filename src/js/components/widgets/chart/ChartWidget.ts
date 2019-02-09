import { Component, Prop, Watch } from 'vue-property-decorator';
import Chart from 'chart.js';
import _ from 'underscore';
import BaseWidget from '../base-widget/BaseWidget';
import template from './chart-widget.html';

@Component({
   name: 'Chart',
   template: template,
})
export default class ChartWidget extends BaseWidget {

   @Prop({ default: 'line' }) public type!: string
   @Prop({ default: {} }) public data!: { chartDatasets: { label: string; points: Object[]; color: string }[] }

   private _chart?: Chart = undefined

   @Watch('data')
   public onDataChange(): void {
      if (!this._chart) {
         return;
      }

      const datasets = _.chain(this.data.chartDatasets)
         .map((dataset): Chart.ChartDataSets => {
            return {
               label: dataset.label,
               data: dataset.points,
               borderColor: dataset.color,
               backgroundColor: dataset.color,
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
            },
            scales: {
               xAxes: [
                  {
                     type: 'time',
                     gridLines: {
                        color: '#666666',
                     },
                     ticks: {
                        fontColor: '#cccccc',
                     },
                  },
               ],
               yAxes: [
                  {
                     gridLines: {
                        color: '#666666',
                     },
                     ticks: {
                        fontColor: '#cccccc',
                     },
                  },
               ],
            },
         },
      });
   }

}
