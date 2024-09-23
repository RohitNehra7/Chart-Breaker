export interface DeliverableData {
  _id: string;
  COP_SR_NOS: number;
  COP_SYMBOL: string;
  COP_SERIES: string;
  COP_TRADED_QTY: number;
  COP_DELIV_QTY: number;
  COP_DELIV_PERC: number;
  TIMESTAMP: string;
  COP_TRADED_DT: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  mTIMESTAMP: string;
}

export interface DeliverableMetaData {
  series: string;
  fromDate: string;
  toDate: string;
  symbols: string[];
}
