import _ from 'underscore';

export default class FeedResultsToSingleValueConverter {

   public convert(feedResults: FeedResults): number | null {
      const results = feedResults.results,
            firstResult = _.first(results);

      return firstResult ? firstResult.value : null;
   }

}
