interface DashboardConfig {
   title: string;
   widgets: DashboardWidgetConfig[];
   dataSources: DataSourceConfig[];
}

interface DataSourceConfig {
   id: string;
   type: 'feed';
   config: FeedDataSourceConfig;
}

interface DashboardWidgetConfig {
   id: string;
   type: 'chart' | 'value';
   title: string;
   layout: WidgetLayout;
   datasets: DatasetConfig[];
   options?: ChartWidgetOptions | ValueWidgetOptions;
}

interface DatasetConfig {
   dataSourceID: string;
   label?: string;
   options: FeedRequest;
}

interface ChartWidgetOptions {
   type?: ChartType;
}

interface ValueWidgetOptions {
   format?: string;
}

interface WidgetVueProps {
   id: string;
   widget: 'chart' | 'value';
   title?: string;
   layout: WidgetLayout;
   dataSource?: { fetch: () => Promise<object> };
}

interface WidgetLayout {
   [ breakpoint: string ]: WidgetSize | undefined;
   default: WidgetSize;
   small?: WidgetSize;
   medium?: WidgetSize;
   large?: WidgetSize;
}

interface WidgetSize {
   width: number;
   height: number;
}
