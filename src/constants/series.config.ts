import { CHART_TYPE, LINE_SERIES_CONFIGS } from "./chart.config.constant";
import * as Highcharts from 'highcharts/highstock';


const LINE_SERIES: Highcharts.SeriesLineOptions = {
    type: "line",
    name: "line series",
    boostThreshold: 1000,
    lineWidth: 1,
    turboThreshold: 1000,
    cropThreshold: 10000,
    step: "left",
    color: "green",
    marker: {
        enabled: true,
        radius: 2,
        symbol: "circle"
    },
    states: {
        hover: {
            lineWidth: 0
        }
    },
    enableMouseTracking: false,
}

const SCATTER_SERIES: Highcharts.SeriesScatterOptions = {
    type: "scatter",
    name: "scatter series",
    clip: true,
    allowPointSelect: true,
    zIndex: 3,
    tooltip: {
        xDateFormat: "%H:%M:%S"
    },
    turboThreshold: 10000,
    lineWidth: 0,
    color: "red",
    marker: {
        radius: 4,
        symbol: "square",
        enabled: undefined,
        enabledThreshold: 0
    },
}

const COLUMN_SERIES: Highcharts.SeriesColumnOptions = {
    type: "column",
    name: "column series",
    boostThreshold: 10000,
    turboThreshold: 1000,
    cropThreshold: 1000,
    color: "#00bdf2",
    grouping: false,
    animationLimit: 1000,
    zIndex: 0,
    pointWidth: 0,
    maxPointWidth: 0,
    tooltip: {
        xDateFormat: "%H:%M:%S"
    },
}

const CHART_CONFIGS: any = {
    [CHART_TYPE.LINE]: LINE_SERIES,
    [CHART_TYPE.SCATTER]: SCATTER_SERIES,
    [CHART_TYPE.COLUMN]: COLUMN_SERIES
}

interface Series extends Highcharts.SeriesOptions {
    marker?: any,
    series?: any
}

export class SeriesConfig<T extends Highcharts.SeriesOptions> {
    private config: any = <Series>LINE_SERIES;
    setAttr(key: string, value: any): SeriesConfig<T> {
        this.config[key] = value;
        return this;
    }
    constructor(name: string, type: string = CHART_TYPE.LINE) {
        if (!name) {
            throw new Error('Series required a name');
        }
        this.config = <Series>{ ...CHART_CONFIGS[type] };
        if (!this.config) {
            this.config = <Series>{ ...CHART_CONFIGS[CHART_TYPE.LINE] }
        }
        this.config.name = name;
    }
    setMarker(marker: any): SeriesConfig<T> {
        if (!this.config['marker']) {
            this.config['marker'] = {}
        }
        this.config = <Series>{
            ...this.config,
            marker: { ...marker }
        }
        return this;
    }
    setMarkerShape(symbol: any): SeriesConfig<T> {
        if (!this.config["marker"]) {
            this.config.marker = {};
        }
        this.config = <Series>{
            ...this.config,
            marker: { ...this.config["marker"], symbol }
        };
        return this;
    }
    build() {
        return <T>this.config;
    }
}