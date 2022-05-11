import React, { useRef, useLayoutEffect } from 'react';
import '../App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Chart(props) {
  const chart = useRef(null);

  //console.log(props.data)

  useLayoutEffect(() => {
     let x = am4core.create("chartdiv", am4charts.XYChart);

    x.paddingRight = 20;


    x.data = props.data;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.baseInterval = {
        "timeUnit": "minute",
        "count": 5
      }

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "timestamp";
    series.dataFields.valueY = "value_x";
    series.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();

    let series2 = x.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "timestamp";
    series2.dataFields.valueY = "value_y";
    series2.stroke = am4core.color("#CDA2AB");
    series2.tooltipText = "{valueY.value}";
    x.cursor = new am4charts.XYCursor();
    
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, []);

  useLayoutEffect(() => {
    chart.current.data = props.data;
}, [props.data]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}
export default Chart;