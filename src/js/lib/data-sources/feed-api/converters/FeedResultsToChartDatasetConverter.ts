import _ from 'underscore';
import moment from 'moment';

export default class FeedResultsToChartDatasetConverter {

   public convert(feedResults: FeedResults): ChartDataset {
      return {
         label: feedResults.label || 'Unknown',
         points: _.chain(feedResults.results)
            .map((point): ChartPoint | {} => {
               return {
                  x: moment(point.timestamp),
                  y: point.value,
               };
            })
            .filter((point) => !_.isEmpty(point))
            .value() as ChartPoint[],
      };
   }

}
