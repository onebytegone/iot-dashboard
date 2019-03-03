import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'underscore';
import ChartWidget from '../widgets/chart/ChartWidget';
import ValueWidget from '../widgets/value/ValueWidget';
import FeedDataSource from '../../lib/data-sources/feed-api/FeedDataSource';
import FeedResultsToChartDatasetConverter from '../../lib/data-sources/feed-api/converters/FeedResultsToChartDatasetConverter';
import FeedResultsToSingleValueConverter from '../../lib/data-sources/feed-api/converters/FeedResultsToSingleValueConverter';
import template from './dashboard.html';

@Component({
   name: 'Dashboard',
   template: template,
   components: {
      Chart: ChartWidget,
      Value: ValueWidget,
   },
})
export default class Dashboard extends Vue {

   @Prop(Object) public configProvider!: {
      getConfig: () => Promise<DashboardConfig>;
   }

   public title: string = ''
   public widgets: WidgetVueProps[] = []

   public mounted(): void {
      this.configProvider.getConfig()
         .then((config) => {
            const dataSources = _.mapObject(_.indexBy(config.dataSources, 'id'), (dataSourceConfig) => {
               if (dataSourceConfig.type === 'feed') {
                  return new FeedDataSource(dataSourceConfig.config);
               }

               // TODO: Other source types

               throw new Error(`Unknown type ${dataSourceConfig.type} for data source ${dataSourceConfig.id}`);
            });

            this.title = config.title;
            this.widgets = _.map(config.widgets, (configEntry): WidgetVueProps => {
               // TODO: extract into validator of some sort
               const undefinedDataSources = _.filter(configEntry.datasets, (datasetConfig) => {
                  return !_.has(dataSources, datasetConfig.dataSourceID);
               });

               if (undefinedDataSources.length) {
                  let undefinedDataSourceIDs = _.pluck(undefinedDataSources, 'dataSourceID');

                  throw new Error(
                     `Found unconfigured data sources (${undefinedDataSourceIDs.join(',')}) for ${configEntry.id}`
                  );
               }

               return {
                  id: configEntry.id,
                  widget: configEntry.type, // TODO: add proper mapping here
                  title: configEntry.title,
                  layout: configEntry.layout,
                  dataSource: {
                     fetch: function() {
                        const promises = _.map(configEntry.datasets, (datasetConfig) => {
                           const dataSource = dataSources[datasetConfig.dataSourceID];

                           return dataSource.fetchFeed(datasetConfig.options)
                              .then((rawDataSet: FeedResults) => {
                                 let datasetConverter;

                                 // TODO: add proper switching here
                                 if (configEntry.type === 'chart') {
                                    datasetConverter = new FeedResultsToChartDatasetConverter();
                                 } else {
                                    datasetConverter = new FeedResultsToSingleValueConverter();
                                 }

                                 // TODO: This needs more thought
                                 return datasetConverter.convert({ ...rawDataSet, ...datasetConfig });
                              });
                        });

                        return Promise.all(promises)
                           .then((dataSets) => {
                              // TODO: add proper switching here
                              if (configEntry.type === 'chart') {
                                 return {
                                    chartDatasets: dataSets,
                                 };
                              }

                              return {
                                 value: _.first(dataSets),
                              };
                           });
                     },
                  },
               };
            });
         });
   }

}
