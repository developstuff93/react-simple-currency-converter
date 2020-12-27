import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Chart({ rates, src, des }) {
  const dates = Object.keys(rates).sort();
  const data = dates.map((date) =>
    Number((rates[date][src] / rates[date][des]).toFixed(3))
  );
  const options = {
    chart: {
      type: "spline"
    },
    title: {
      text: `Historical View for ${src} / ${des}`
    },
    subtitle: {
      text: ""
    },
    tooltip: {
      formatter: function () {
        return `${this.x} : ${this.y}`;
      }
    },
    xAxis: {
      categories: dates,
      title: {
        text: des
      }
    },
    yAxis: {
      title: {
        text: src
      }
    },
    series: [
      {
        showInLegend: false,
        data: data
      }
    ]
  };
  return (
    <div>
      {dates.length && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </div>
  );
}

export default Chart;
