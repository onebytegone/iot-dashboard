export default {
   title: 'Climate Tracking',
   widgets: [
      {
         id: 'widget_humidity_temp_24h',
         type: 'chart',
         title: 'Last 24h',
         layout: {
            default: { width: 12, height: 10 },
            medium: { width: 9, height: 10 },
         },
         datasets: [
            {
               dataSourceID: 'feedDataSource',
               label: 'Temperature',
               options: {
                  feed: 'device1',
                  facet: 'temperature',
                  start: '-24h',
                  span: '15m',
                  aggregation: 'avg',
               },
            },
            {
               dataSourceID: 'feedDataSource',
               label: 'Humidity',
               options: {
                  feed: 'device1',
                  facet: 'humidity',
                  start: '-24h',
                  span: '15m',
                  aggregation: 'avg',
               },
            },
         ],
      },
      {
         id: 'widget_last_temp',
         type: 'value',
         title: 'Last reported temperature (°F)',
         layout: {
            default: { width: 12, height: 5 },
            medium: { width: 3, height: 5 },
         },
         datasets: [
            {
               dataSourceID: 'feedDataSource',
               options: {
                  feed: 'device1',
                  facet: 'temperature',
                  start: '-5m',
                  span: '5m',
                  aggregation: 'last',
               },
            },
         ],
      },
      {
         id: 'widget_last_humidity',
         type: 'value',
         title: 'Last reported humidity (%)',
         layout: {
            default: { width: 12, height: 5 },
            medium: { width: 3, height: 5 },
         },
         datasets: [
            {
               dataSourceID: 'feedDataSource',
               options: {
                  feed: 'device1',
                  facet: 'humidity',
                  start: '-5m',
                  span: '5m',
                  aggregation: 'last',
               },
            },
         ],
      },
      {
         id: 'widget_humidity_temp_7d',
         type: 'chart',
         title: 'Last 7d',
         layout: {
            default: { width: 12, height: 10 },
         },
         datasets: [
            {
               dataSourceID: 'feedDataSource',
               label: 'Temperature',
               options: {
                  feed: 'device1',
                  facet: 'temperature',
                  start: '-7d',
                  span: '1h',
                  aggregation: 'avg',
               },
            },
            {
               dataSourceID: 'feedDataSource',
               label: 'Humidity',
               options: {
                  feed: 'device1',
                  facet: 'humidity',
                  start: '-7d',
                  span: '1h',
                  aggregation: 'avg',
               },
            },
         ],
      },
   ] as DashboardWidgetConfig[],
   dataSources: [
      {
         id: 'feedDataSource',
         type: 'feed',
         config: {
            endpoint: 'https://localhost:3000/feed/',
            token: 'API_TOKEN_GOES_HERE',
         },
      },
   ] as DataSourceConfig[],
} as DashboardConfig;
