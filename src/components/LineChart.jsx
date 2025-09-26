import React,{useEffect, useRef} from "react";
import * as d3 from "d3";

function InitializeSVG(svgRef, height, width){
    // makes the drawing canvas blank
    d3.select(svgRef).selectAll("*").remove();

    const svg=d3.
        select(svgRef.current)
        .attr("height",height)
            .attr("width",width)
    
            return svg
}

function CreateScales(data,height,width){
    // X scale range definition
    const X_domain=d3.extent(data,(d)=>d.x) //for each d in data return d.x
    const X_range=[40,width-40]

    // Y scale range defintion
    const Y_domain=[0, d3.max(data, (d)=>d.y)]
    const Y_range=[height-40,40]

    // x and y are function sthat take any coordinate value,
    // and give the corresponding pixel value in the coordinate
    // X scale
    const x=d3.scaleLinear()
            .domain(X_domain)
            .range(X_range)

    // Y scale
    const y=d3.scaleLinear()
            .domain(Y_domain)
            .range(Y_range)
    
    return {x,y}
}

function DrawLine(svg,data,x,y){
    const line =d3.line()
        .x(d=>x(d.x))
        .y(d=>y(d.y))
    
    const path=svg
        .append("path")
        .datum(data)
        .attr("class","line-chart")
        .attr("d",line) // runs the line function and sets the result of line, a svg representing the line to the d
    
    const points=svg.selectAll("circle")
            .data(data) //data because multiple circles are to be drawn
            .enter()
            .append("circle")

    points.attr("cx",(d)=>x(d.x))
        .attr("cy",(d)=>y(d.y))
        .attr("fill","black");

    const texts=svg.selectAll("text")
            .data(data.slice(1,data.length-1))
            .enter()
            .append("text")
            .attr("class","point-text")
            .attr("x",(d,i)=>x(d.x))
            .attr("y",(d,i)=>{
                const isAbove= i%2===0
                return isAbove? y(d.y)-15: y(d.y)+25;
            })
            .attr("label-content",d=>d.text)
            .text(d=>d.text)
            .attr("opacity",0)
            

    const totalLength=path.node().getTotalLength()

    return {path,totalLength, points,texts}

}

function AnimateLine(path,totalLength, points,texts){
    path
        .attr("stroke-dasharray",`${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset",totalLength)
            .transition()
                .duration(7000)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset",0)
    
    
    const data_size=points.size()
    points
        .attr("r",0)
            .transition()
            .delay((d,i)=>{
                const distance = (i / (data_size - 1)) * totalLength;
                const timeFraction = distance / totalLength;
                return timeFraction * 7000; 
            })
            .duration(700)
            .attr("r",5)
    
    texts.transition()
        .delay((d,i)=>{
            const originalIndex=i+1;
            const distance=(originalIndex/(data_size-1))*totalLength;
            const timeFraction=distance/totalLength;
            return timeFraction*7000;
        }
        )
        .duration(700)
        .attr("opacity",1);
}

function LineChart({data_labels}){

    const points_data=[
        {x:10,y:40},
        {x:20,y:40},
        {x:30,y:40},
        {x:40,y:40},
        {x:50,y:40},
        {x:60,y:40},
    ]
    const labels=[null,...data_labels,null];

    const data= points_data.map(
        (d,i)=>(
            {
                ...d,
                text:labels[i],
            }
        )
    );

    const width=500;
    const height=300;

    // defining a pointer to be used for SVG drawing
    const svgRef=useRef();

    useEffect(()=>{
        const svg=InitializeSVG(svgRef,height,width)
        const {x,y}=CreateScales(data,height,width)
        const {path,totalLength,points,texts}=DrawLine(svg,data,x,y)
        AnimateLine(path,totalLength,points,texts)
    },[]);
    

    return <svg ref={svgRef}/>     
}

export default LineChart;