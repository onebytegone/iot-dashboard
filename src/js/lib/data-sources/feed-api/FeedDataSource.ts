import _ from 'underscore';

export default class FeedDataSource {

   private _endpoint: string;
   private _token: string;

   public constructor(config: FeedDataSourceConfig) {
      this._endpoint = config.endpoint.replace(/\/$/, '');
      this._token = config.token;
   }

   public fetchFeed(request: FeedRequest): Promise<FeedResults> {
      const queryParams = {
         start: request.start,
         end: request.end,
         span: request.span,
         aggregation: request.aggregation,
      };

      const queryString = _.chain(queryParams)
         .pick((value?: string) => !_.isUndefined(value))
         .map((value, key) => `${key}=${value}`)
         .value()
         .join('&');

      const opts = {
         headers: {
            Authorization: `Bearer ${this._token}`,
         },
      };

      return fetch(`${this._endpoint}/${request.feed}/${request.facet}/?${queryString}`, opts)
         .then((response) => {
            return response.json();
         });
   }

}
