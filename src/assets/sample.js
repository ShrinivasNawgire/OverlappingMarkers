    this.chart = Highcharts.chart('container', {
      title: {
        text: null
      },
      xAxis: {
        min: -0.5,
        max: 5.5
      },
      yAxis: {
        min: 0
      },
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
            }
          },
          series: {
            marker: {
              enabled: true
            },
            point: {
              events: {
                mouseOut: () => { }
              }
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
        },
        series: []
      },

      series: [
        {
          type: "line",
          name: "line series",
          boostThreshold: 1000,
          lineWidth: 1,
          turboThreshold: 1000,
          cropThreshold: 10000,
          step: "left",
          color: "green",
          data: [1, 3, 1.2, 4],
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
          enableMouseTracking: false
        },
        {
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
          data: [1, 2, 3],
          marker: {
            radius: 8,
            symbol: "square",
            enabled: undefined,
            enabledThreshold: 0
          }
        },
        {
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
          data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
          marker: {
            radius: 4
          }
        }
      ]
    });
  }