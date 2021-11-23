import { Component, setTestabilityGetter } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { CHART_TYPE, LINE_SERIES_CONFIGS, SCATTER_SERIES_CONFIGS, COLUMN_SERIS_CONFIGS, YAXIS_CONFIGS } from 'src/constants/chart.config.constant';
import { SeriesConfig } from 'src/constants/series.config';
const scatterSeries1 = require('./../assets/dummyJSON/scatterSeries1.json');
const scatterSeries2 = require('./../assets/dummyJSON/scatterSeries2.json');
const scatterSeries3 = require('./../assets/dummyJSON/scatterSeries3.json');
const scatterSeries4 = require('./../assets/dummyJSON/scatterSeries4.json');
const scatterSeries5 = require('./../assets/dummyJSON/scatterSeries5.json');
const scatterSeries6 = require('./../assets/dummyJSON/scatterSeries6.json');
const scatterSeries7 = require('./../assets/dummyJSON/scatterSeries7.json');
const scatterSeries8 = require('./../assets/dummyJSON/scatterSeries8.json');
const scatterSeries9 = require('./../assets/dummyJSON/scatterSeries9.json');
const scatterSeries10 = require('./../assets/dummyJSON/scatterSeries10.json');
const scatterSeries11 = require('./../assets/dummyJSON/scatterSeries11.json');
const scatterSeries12 = require('./../assets/dummyJSON/scatterSeries12.json');
const scatterSeries13 = require('./../assets/dummyJSON/scatterSeries13.json');

const lineSeries1 = require('./../assets/dummyJSON/lineSeries1.json');
const lineSeries2 = require('./../assets/dummyJSON/lineSeries2.json');
const lineSeries3 = require('./../assets/dummyJSON/lineSeries31.json');
const lineSeries4 = require('./../assets/dummyJSON/lineSeries32.json');
const lineSeries5 = require('./../assets/dummyJSON/lineSeries33.json');
const lineSeries6 = require('./../assets/dummyJSON/lineSeries34.json');
const lineSeries7 = require('./../assets/dummyJSON/lineSeries35.json');

const columnSeries1 = require('./../assets/dummyJSON/columnSeries1.json');
const columnSeries2 = require('./../assets/dummyJSON/columnSeries2.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Highcharts demo";
  scatterSeriesAll: any;
  columnSeriesAll: any;
  lineSeriesAll: any;
  options: any;

  ngOnInit() {
    const SERIES = this.getSeries();

    this.options = {
      chart: {
        plotBackgroundColor: "#ffffff",
        zoomType: 'x',
        borderWidth: 1,
        borderColor: "transparent",
        backgroundColor: "#f6f6f6",
        marginRight: 3,
        marginBottom: 40,
        marginTop: 20,
        resetZoomButton: {
          theme: {
            display: "none"
          }
        }
      },
      height: '750px',
      title: {
        text: ''
      },
      xAxis: {
        crosshair: true,
        type: 'datetime',
        minTickInterval: 1000,
        minRange: 10000,
        offset: 0,
        labels: {
          text: ''
        }
      },
      yAxis: this.getYAxis(),
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          states: {
            inactive: {
              opacity: 0.7
            }
          }
        },
        scatter: {
          marker: {
            states: {
              select: {
                fillColor: null,
                lineWidth: 1,
                lineColor: "black"
              }
            }
          },
          states: {
            inactive: {
              opacity: 0.7
            },
            select: {
              lineWidthPlus: 2
            }
          }
        },
        line: {
          states: {
            inactive: {
              opacity: 0.7
            },
          },
          series: {
            marker: {
              enabled: true
            }
          }
        },
        legend: {
          enabled: false,
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          floating: true
        },
        tooltip: {
          style: {
            display: "none"
          }
        }
      },
      series: [...SERIES],
      boost: {
        allowForce: true,
        seriesThreshold: 5
      },
    }
  }

  ngAfterViewInit() {
    require('highcharts/highcharts-more')(Highcharts);
    require('highcharts/modules/boost')(Highcharts);

    Highcharts.chart('container', this.options);
  }

  getSeries() {
    const columnSeries = this.getColumnSeries();
    const scatterSeries = this.getScatterSeries();
    const lineSeries = this.getLineSeries();
    return [...columnSeries, ...scatterSeries, ...lineSeries];
  }

  getColumnSeries() {
    const allColumnSeries: Array<any> = [];
    allColumnSeries.push(columnSeries1, columnSeries2);

    return COLUMN_SERIS_CONFIGS.map(obj => {
      const series: SeriesConfig<Highcharts.SeriesColumnOptions> = new SeriesConfig<Highcharts.SeriesColumnOptions>(obj.chartId, CHART_TYPE.COLUMN);
      const seriesData = allColumnSeries.find(series => series.seriesName === obj.chartId);

      if (!seriesData) {
        return;
      }

      series
        .setAttr("color", obj.color)
        .setAttr("yAxis", 2)
        .setAttr("zIndex", 0)
        .setAttr("legendIndex", 19)
        .setAttr("index", 0)
        .setAttr("showInLegend", false)
        .setAttr("data", seriesData.data);
      return series.build();
    })
  }

  getScatterSeries() {
    const allScatterSeries: Array<any> = [];
    allScatterSeries.push(scatterSeries1, scatterSeries2, scatterSeries3, scatterSeries4,
      scatterSeries5, scatterSeries6
      // , scatterSeries7, scatterSeries8, scatterSeries9,
      // scatterSeries10, scatterSeries11, scatterSeries12, scatterSeries13
      );

    return SCATTER_SERIES_CONFIGS.map(obj => {
      const series: SeriesConfig<Highcharts.SeriesScatterOptions> = new SeriesConfig<Highcharts.SeriesScatterOptions>(obj.chartId, CHART_TYPE.SCATTER);
      const seriesData = allScatterSeries.find(series => series.seriesName === obj.chartId);

      if (!seriesData) {
        return;
      }

      series
        .setAttr("color", obj.color)
        .setAttr("zIndex", 1)
        .setAttr("showInLegend", false)
        .setAttr("legendIndex", obj.legendIndex)
        .setAttr("index", obj.index)
        .setAttr("id", obj.chartId)
        .setAttr("yAxis", 1);

      if (obj.symbol) {
        series.setMarkerShape(obj.symbol);
      }
      if (obj.marker) {
        series.setAttr("marker", obj.marker);
      }

      series.setAttr("data", seriesData.data ? seriesData.data : []);
      return series.build();
    });
  }

  getLineSeries() {
    const allLineSeries: Array<any> = [];
    allLineSeries.push(lineSeries1, lineSeries2,
      //  lineSeries3, lineSeries4, lineSeries5, lineSeries6, lineSeries7
       );

    return LINE_SERIES_CONFIGS.map(obj => {
      const series: SeriesConfig<Highcharts.SeriesLineOptions> = new SeriesConfig<Highcharts.SeriesLineOptions>(obj.chartId, CHART_TYPE.LINE);
      const seriesData = allLineSeries.find(series => series.seriesName === obj.chartId);

      if (!seriesData) {
        return;
      }

      series
        .setAttr("step", "left")
        .setAttr("color", obj.color)
        .setAttr("yAxis", 0)
        .setAttr("zIndex", 0)
        .setAttr("legendIndex", 99)
        .setAttr("index", 0)
        .setAttr("showInLegend", false)
        .setAttr("data", seriesData.data);

      return series.build();
    });
  }

  getYAxis() {
    return YAXIS_CONFIGS;
  }
}
