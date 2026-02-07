(function() {
    namespace("aarc.marketDataProvider", calculateOptions, calculatePnL, calculateEF, options, underlyingPrices, stocks, stockTimeSeries, stocksHeatmap);


    function stocksHeatmap() {
        return new kendo.data.HierarchicalDataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/Services/AarcWebTools.svc/MarketCap",
                    dataType: "json"
                }
            },
            schema: {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;

                },
                model: {
                    children: "items"
                }
            },
            type: "odata"
        });
    };
    function calculateOptions() {
        return new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 6,
            schema: {
                data: function(data) {
                    return data;
                },
                total: function(data) {
                    return data.length;

                },
                model: { // define the model of the data source. Required for validation and property types.
                    fields: {
                        Model: { type: "string" },
                        K: { type: "number" },
                        T: { type: "number" },
                        C: { type: "number" },
                        P: { type: "number" }
                    }
                }
            },
            type: "odata",
            transport: {
                read: {
                    url: "/Services/AarcWebTools.svc/CalculateOptions",
                    dataType: "json"
                }
            }
        });
    };

    function calculatePnL() {
        return new kendo.data.DataSource({
            serverPaging: false,
            schema: {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;

                },
                model: { // define the model of the data source. Required for validation and property types.
                    fields: {
                        Profit: { type: "number" },
                        Percent: { type: "number" }
                    }
                }
            },
            transport: {
                read: {
                    url: "/Services/AarcWebTools.svc/CalculateProfit",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8", // tells the web service to serialize JSON
                }
            }
        });
    };

    function calculateEF() {
        return new kendo.data.DataSource({
            serverPaging: false,
            schema: {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;

                }
            },
            transport: {
                read: {
                    url: "/Services/AarcWebTools.svc/EfficientFrontier",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8", // tells the web service to serialize JSON
                }
            }
        });
    };

    function stocks() {
        return new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "/Services/AarcWebTools.svc/Stocks",
                dataType: "json"
            },
            schema: {
                data: function (data) {
                    return data.value;
                },
                total: function (data) {
                    return data['odata.count'];

                },
                model: {
                    fields: {
                        Ticker: { type: "string" },
                        Description: { type: "string" },
                        MarketCap: { type: "number" },
                        OptionCategory: { type: "boolean" }
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        });
    };
    function options() {
        return new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "/Services/AarcWebTools.svc/Options",
                dataType: "json"
            },
            schema: {
                data: function(data) {
                    return data.value;
                },
                total: function(data) {
                    return data['odata.count'];

                },
                model: {
                    fields: {
                        Ticker: { type: "string" },
                        Date: { type: "date" },
                        Strike: { type: "number" },
                        Expiry: { type: "date" },
                        Bid: { type: "number" },
                        Ask: { type: "number" },
                        Mid: { type: "number" },
                        Close: { type: "number" },
                        ImpliedVol: { type: "number" },
                        Volume: { type: "number" },
                        OpenInterest: { type: "number" }
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        });
    };

    function underlyingPrices() {
        return new kendo.data.DataSource({
            type: "odata",
            transport: {
                read: "/Services/AarcWebTools.svc/UnderlyingPrices",
                dataType: "json"
            },
            schema: {
                data: function(data) {
                    return data.value;
                },
                total: function(data) {
                    return data['odata.count'];

                },
                model: {
                    fields: {
                        Id: { type: "number" },
                        Ticker: { type: "string" },
                        CreatedDate: { type: "number" },
                        Date: { type: "date" },
                        Open: { type: "number" },
                        Close: { type: "number" },
                        High: { type: "number" },
                        Low: { type: "number" },
                        Volume: { type: "number" },
                        Intraday: { type: "boolean" },
                        AdjustUpdate: { type: "date" },
                        AdjustedClose: { type: "number" }
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        });
    };

    function stockTimeSeries() {
         return new kendo.data.DataSource({
            transport: {
                read: {
                    url: function () {
                        return "/api/UnderlyingTimeSeries";
                    },
                    dataType: "json"
                }
            },

            group: {
                field: "Ticker"
            },

            sort: {
                field: "Date",
                dir: "asc"
            }
        });
    };
})();
