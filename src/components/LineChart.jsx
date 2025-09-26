import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../css/components/LineChart.css";

function InitializeSVG(svgRef, height, width) {
  d3.select(svgRef.current).selectAll("*").remove();

  const svg = d3
    .select(svgRef.current)
    .attr("height", height)
    .attr("width", width)
    .attr("viewBox", `0 0 ${width} ${height}`);

const g=svg.append("g")
    // .attr("transform",`translate(${width/2},${height/2})`)

  return svg;
}

function CreateScales(data, height, width) {
  const X_domain = d3.extent(data, (d) => d.x);
  const X_range = [40, width-40];
//   const X_range = [-width/2 + 40, width/2 - 40];

  const Y_domain = [0, d3.max(data, (d) => d.y)];
  const Y_range = [ height-40, 40];
//   const Y_range = [height/2 - 40, -height/2+40];

  const x = d3.scaleLinear().domain(X_domain).range(X_range);
  const y = d3.scaleLinear().domain(Y_domain).range(Y_range);

  return { x, y };
}

function DrawLine(svg, data, x, y) {
  const line = d3.line().x((d) => x(d.x)).y((d) => y(d.y));

  const path = svg
    .append("path")
    .datum(data)
    .attr("class", "line-chart-path")
    .attr("d", line)
    .attr("stroke", "black")
    .attr("fill", "none");

  const points = svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "line-chart-point")
    .attr("cx", (d) => x(d.x))
    .attr("cy", (d) => y(d.y))
    .attr("fill", "black");

  const texts = svg
    .selectAll("text")
    .data(data.slice(1, data.length - 1))
    .enter()
    .append("text")
    .attr("class", "line-chart-text")
    .attr("x", (d) => x(d.x))
    .attr("y", (d, i) => {
      const isAbove = i % 2 === 0;
      return isAbove ? y(d.y) - 15 : y(d.y) + 25;
    })
    .text((d) => d.text)
    .attr("opacity", 0);

  const totalLength = path.node().getTotalLength();

  return { path, totalLength, points, texts };
}

function AnimateLine(path, totalLength, points, texts, elapsedFraction) {
  const duration = 7000;
  const remainingTime = (1 - elapsedFraction) * duration;

  // Start line from current fraction
  path
    .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
    .attr("stroke-dashoffset", totalLength * (1 - elapsedFraction))
    .transition()
    .duration(remainingTime)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0);

  const data_size = points.size();

  points
    .attr("r", (d, i) => (i / (data_size - 1) <= elapsedFraction ? 5 : 0))
    .transition()
    .delay((d, i) => {
      const fraction = i / (data_size - 1);
      if (fraction <= elapsedFraction) return 0;
      return fraction * duration - elapsedFraction * duration;
    })
    .duration(700)
    .attr("r", 5);

  texts
    .attr("opacity", (d, i) => {
      const originalIndex = i + 1;
      const fraction = originalIndex / (data_size - 1);
      return fraction <= elapsedFraction ? 1 : 0;
    })
    .transition()
    .delay((d, i) => {
      const originalIndex = i + 1;
      const fraction = originalIndex / (data_size - 1);
      if (fraction <= elapsedFraction) return 0;
      return fraction * duration - elapsedFraction * duration;
    })
    .duration(700)
    .attr("opacity", 1);
}

function LineChart({ data_labels }) {
  const points_data = [
    { x: 10, y: 40 },
    { x: 20, y: 40 },
    { x: 30, y: 40 },
    { x: 40, y: 40 },
    { x: 50, y: 40 },
    { x: 60, y: 40 },
  ];
  const labels = [null, ...data_labels, null];

  const data = points_data.map((d, i) => ({
    ...d,
    text: labels[i],
  }));

  const wrapperRef = useRef();
  const svgRef = useRef();
  const startTimeRef = useRef(Date.now()); // track when animation started

  useEffect(() => {
    function drawChart() {
      if (!wrapperRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const duration = 7000;
      const elapsedFraction = Math.min(elapsed / duration, 1);
    
      const rect = wrapperRef.current.getBoundingClientRect();
      const width = wrapperRef.current.clientWidth;
      const height = wrapperRef.current.clientHeight;

      const svg = InitializeSVG(svgRef, height, width);
      const { x, y } = CreateScales(data, height, width);
      const { path, totalLength, points, texts } = DrawLine(svg, data, x, y);
      AnimateLine(path, totalLength, points, texts, elapsedFraction);
    }

    drawChart();
    window.addEventListener("resize", drawChart);

    return () => {
      window.removeEventListener("resize", drawChart);
    };
  }, [data]);

  return (
    <div ref={wrapperRef} className="line-chart-background">
      <svg ref={svgRef} />
    </div>
  );
}

export default LineChart;
