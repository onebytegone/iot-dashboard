interface FeedDataSourceConfig {
   endpoint: string;
   token: string;
}
interface FeedRequest {
   feed: string;
   facet: string;
   start: string;
   end?: string;
   span: string;
   aggregation: FeedAggregationType;
}

type FeedAggregationType = 'avg' | 'max' | 'min' | 'sum' | 'first' | 'last';

interface FeedResults {
   label?: string;
   results: FeedDataPoint[];
}

interface FeedDataPoint {
   timestamp: string;
   value: number;
}
