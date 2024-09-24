"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NseIndia = exports.ApiList = void 0;
const axios_1 = __importDefault(require("axios"));
const user_agents_1 = __importDefault(require("user-agents"));
const utils_1 = require("./utils");
var ApiList;
(function (ApiList) {
    ApiList["GLOSSARY"] = "/api/cmsContent?url=/glossary";
    ApiList["HOLIDAY_TRADING"] = "/api/holiday-master?type=trading";
    ApiList["HOLIDAY_CLEARING"] = "/api/holiday-master?type=clearing";
    ApiList["MARKET_STATUS"] = "/api/marketStatus";
    ApiList["MARKET_TURNOVER"] = "/api/market-turnover";
    ApiList["ALL_INDICES"] = "/api/allIndices";
    ApiList["INDEX_NAMES"] = "/api/index-names";
    ApiList["CIRCULARS"] = "/api/circulars";
    ApiList["LATEST_CIRCULARS"] = "/api/latest-circular";
    ApiList["EQUITY_MASTER"] = "/api/equity-master";
    ApiList["MARKET_DATA_PRE_OPEN"] = "/api/market-data-pre-open?key=ALL";
    ApiList["MERGED_DAILY_REPORTS_CAPITAL"] = "/api/merged-daily-reports?key=favCapital";
    ApiList["MERGED_DAILY_REPORTS_DERIVATIVES"] = "/api/merged-daily-reports?key=favDerivatives";
    ApiList["MERGED_DAILY_REPORTS_DEBT"] = "/api/merged-daily-reports?key=favDebt";
    ApiList["AUTOCOMPLETE"] = "/api/search/autocomplete?q=";
    ApiList["DELIVERABLE_QUANTITY"] = "/api/historical/securityArchives?dataType=deliverable&series=ALL&";
})(ApiList || (exports.ApiList = ApiList = {}));
class NseIndia {
    constructor() {
        this.baseUrl = 'https://www.nseindia.com';
        this.cookies = '';
        this.userAgent = '';
        this.cookieUsedCount = 0;
        this.cookieMaxAge = 60; // should be in seconds
        this.cookieExpiry = new Date().getTime() + this.cookieMaxAge * 1000;
        this.noOfConnections = 0;
        this.baseHeaders = {
            Authority: 'www.nseindia.com',
            Referer: 'https://www.nseindia.com/',
            Accept: '*/*',
            Origin: this.baseUrl,
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Ch-Ua': '" Not A;Brand";v="99", "Chromium";v="109", "Google Chrome";v="109"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
        };
    }
    async getNseCookies() {
        if (this.cookies === '' ||
            this.cookieUsedCount > 10 ||
            this.cookieExpiry <= new Date().getTime()) {
            this.userAgent = new user_agents_1.default().toString();
            const response = await axios_1.default.get(this.baseUrl, {
                headers: Object.assign(Object.assign({}, this.baseHeaders), { 'User-Agent': this.userAgent }),
            });
            const setCookies = response.headers['set-cookie'];
            const cookies = [];
            setCookies === null || setCookies === void 0 ? void 0 : setCookies.forEach((cookie) => {
                const requiredCookies = [
                    'nsit',
                    'nseappid',
                    'ak_bmsc',
                    'AKA_A2',
                    'bm_mi',
                    'bm_sv',
                ];
                const cookieKeyValue = cookie.split(';')[0];
                const cookieEntry = cookieKeyValue.split('=');
                /* istanbul ignore else */
                if (requiredCookies.includes(cookieEntry[0])) {
                    cookies.push(cookieKeyValue);
                }
            });
            this.cookies = cookies.join('; ');
            this.cookieUsedCount = 0;
            this.cookieExpiry = new Date().getTime() + this.cookieMaxAge * 1000;
        }
        this.cookieUsedCount++;
        return this.cookies;
    }
    /**
     *
     * @param url NSE API's URL
     * @returns JSON data from NSE India
     */
    async getData(url) {
        let retries = 0;
        let hasError = false;
        do {
            while (this.noOfConnections >= 5) {
                await (0, utils_1.sleep)(500);
            }
            this.noOfConnections++;
            console.log(url);
            try {
                const response = await axios_1.default.get(url, {
                    headers: Object.assign(Object.assign({}, this.baseHeaders), { Cookie: await this.getNseCookies(), 'User-Agent': this.userAgent }),
                });
                this.noOfConnections--;
                return response.data;
            }
            catch (error) {
                hasError = true;
                retries++;
                this.noOfConnections--;
                if (retries >= 10)
                    throw error;
            }
        } while (hasError);
    }
    /**
     *
     * @param apiEndpoint
     * @returns
     */
    async getDataByEndpoint(apiEndpoint) {
        return this.getData(`${this.baseUrl}${apiEndpoint}`);
    }
    /**
     *
     * @returns List of NSE equity symbols
     */
    async getAllStockSymbols() {
        const { data } = await this.getDataByEndpoint(ApiList.MARKET_DATA_PRE_OPEN);
        return data
            .map((obj) => obj.metadata.symbol)
            .sort();
    }
    /**
     *
     * @param symbol
     * @returns
     */
    getEquityDetails(symbol) {
        return this.getDataByEndpoint(`/api/quote-equity?symbol=${encodeURIComponent(symbol.toUpperCase())}`);
    }
    /**
     *
     * @param symbol
     * @returns
     */
    getEquityTradeInfo(symbol) {
        return this.getDataByEndpoint(`/api/quote-equity?symbol=${encodeURIComponent(symbol.toUpperCase())}&section=trade_info`);
    }
    /**
     *
     * @param symbol
     * @returns
     */
    getEquityCorporateInfo(symbol) {
        return this.getDataByEndpoint(`/api/top-corp-info?symbol=${encodeURIComponent(symbol.toUpperCase())}&market=equities`);
    }
    /**
     *
     * @param symbol
     * @param isPreOpenData
     * @returns
     */
    async getEquityIntradayData(symbol, isPreOpenData = false) {
        const details = await this.getEquityDetails(symbol.toUpperCase());
        const identifier = details.info.identifier;
        let url = `/api/chart-databyindex?index=${identifier}`;
        if (isPreOpenData)
            url += '&preopen=true';
        return this.getDataByEndpoint(url);
    }
    /**
     *
     * @param symbol
     * @param range
     * @returns
     */
    async getEquityHistoricalData(symbol, range) {
        const data = await this.getEquityDetails(symbol.toUpperCase());
        const activeSeries = data.info.activeSeries.length
            ? data.info.activeSeries[0]
            : /* istanbul ignore next */ 'EQ';
        if (!range) {
            range = { start: new Date(data.metadata.listingDate), end: new Date() };
        }
        const dateRanges = (0, utils_1.getDateRangeChunks)(range.start, range.end, 66);
        const promises = dateRanges.map(async (dateRange) => {
            const url = `/api/historical/cm/equity?symbol=${encodeURIComponent(symbol.toUpperCase())}` +
                `&series=[%22${activeSeries}%22]&from=${dateRange.start}&to=${dateRange.end}`;
            return this.getDataByEndpoint(url);
        });
        return Promise.all(promises);
    }
    /**
     *
     * @param symbol
     * @returns
     */
    getEquitySeries(symbol) {
        return this.getDataByEndpoint(`/api/historical/cm/equity/series?symbol=${encodeURIComponent(symbol.toUpperCase())}`);
    }
    /**
     *
     * @param index
     * @returns
     */
    getEquityStockIndices(index) {
        return this.getDataByEndpoint(`/api/equity-stockIndices?index=${encodeURIComponent(index.toUpperCase())}`);
    }
    /**
     *
     * @param index
     * @param isPreOpenData
     * @returns
     */
    getIndexIntradayData(index, isPreOpenData = false) {
        let endpoint = `/api/chart-databyindex?index=${index.toUpperCase()}&indices=true`;
        if (isPreOpenData)
            endpoint += '&preopen=true';
        return this.getDataByEndpoint(endpoint);
    }
    /**
     *
     * @param index
     * @param range
     * @returns
     */
    async getIndexHistoricalData(index, range) {
        const dateRanges = (0, utils_1.getDateRangeChunks)(range.start, range.end, 66);
        const promises = dateRanges.map(async (dateRange) => {
            const url = `/api/historical/indicesHistory?indexType=${encodeURIComponent(index.toUpperCase())}` +
                `&from=${dateRange.start}&to=${dateRange.end}`;
            return this.getDataByEndpoint(url);
        });
        return Promise.all(promises);
    }
    /**
     *
     * @param indexSymbol
     * @returns
     */
    getIndexOptionChain(indexSymbol) {
        return this.getDataByEndpoint(`/api/option-chain-indices?symbol=${encodeURIComponent(indexSymbol.toUpperCase())}`);
    }
    /**
     *
     * @param symbol
     * @returns
     */
    getEquityOptionChain(symbol) {
        return this.getDataByEndpoint(`/api/option-chain-equities?symbol=${encodeURIComponent(symbol.toUpperCase())}`);
    }
}
exports.NseIndia = NseIndia;
