type ChartType = 'line' | 'bar';

interface ChartWidgetData {
   chartDatasets?: ChartDataset[];
}

interface ChartDataset {
   label: string;
   points: ChartPoint[];
   color?: string;
}

interface ChartPoint {
   x: string | number;
   y: number;
}
