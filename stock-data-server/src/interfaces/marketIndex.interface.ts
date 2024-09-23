export interface IndexEquityInfo {
  priority: number;
  symbol: string;
  identifier: string;
  series: string;
  open: number;
  dayHigh: number;
  dayLow: number;
  lastPrice: number;
  previousClose: number;
  change: number;
  pChange: number;
  totalTradedVolume: number;
  totalTradedValue: number;
  lastUpdateTime: string;
  yearHigh: number;
  ffmc: number;
  yearLow: number;
  nearWKH: number;
  nearWKL: number;
  perChange365d: number;
  date365dAgo: string;
  chart365dPath: string;
  date30dAgo: string;
  perChange30d: number;
  chart30dPath: string;
  chartTodayPath: string;
  meta: {
    symbol: string;
    companyName: string;
    industry: string;
    activeSeries: string[];
    debtSeries: any[];
    tempSuspendedSeries: any[];
    isFNOSec: boolean;
    isCASec: boolean;
    isSLBSec: boolean;
    isDebtSec: boolean;
    isSuspended: boolean;
    isETFSec: boolean;
    isDelisted: boolean;
    isin: string;
  };
}

export interface IndexDetails {
  name: string;
  advance: { declines: string; advances: string; unchanged: string };
  timestamp: string;
  data: IndexEquityInfo[];
  metadata: {
    indexName: string;
    open: number;
    high: number;
    low: number;
    previousClose: number;
    last: number;
    percChange: number;
    change: number;
    timeVal: string;
    yearHigh: number;
    yearLow: number;
    totalTradedVolume: number;
    totalTradedValue: number;
    ffmc_sum: number;
  };
  marketStatus: {
    market: string;
    marketStatus: string;
    tradeDate: string;
    index: string;
    last: number;
    variation: number;
    percentChange: number;
    marketStatusMessage: string;
  };
  date30dAgo: string;
  date365dAgo: string;
}

export interface MarketIndexData {
  key: string;
  index: string;
  indexSymbol: string;
  last: number;
  variation: number;
  percentChange: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  yearHigh: number;
  yearLow: number;
  indicativeClose: number;
  pe: string;
  pb: string;
  dy: string;
  declines: string;
  advances: string;
  unchanged: string;
  perChange365d: number;
  date365dAgo: string;
  chart365dPath: string;
  date30dAgo: string;
  perChange30d: number;
  chart30dPath: string;
  chartTodayPath: string;
  previousDay: number;
  oneWeekAgo: number;
  oneMonthAgo: number;
  oneYearAgo: number;
}
