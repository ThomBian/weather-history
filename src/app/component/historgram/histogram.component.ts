import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import *  as d3 from 'd3';

const data:any = {
    "8":11,
    "10":14,
    "12":16,
    "14":18,
    "16":20,
    "18":16,
    "20":12,
    "22":8,
}

const test:number [] = [
    3,4,5,7,8,12,34
]

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear().range([0, 340]);


@Component({
    selector: 'histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class Histogram implements OnInit{

    margin = {
        top: 20,
        bottom: 90,
        right: 10,
        left: 10
    }
    width:number = 600 - this.margin.left - this.margin.right;
    height:number = 400 - this.margin.top - this.margin.bottom;
    chart:any;

    data:{} = data;
    values: number[];
    keys: any[];
    
    constructor() {
        this.values = Object.values(this.data).map(Number);
        this.keys = Object.keys(this.data);
    }
    
    createHistrogram() {

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(this.values)])
            .range([this.height, 0]); // [height, 0] due to top left corner reference in svg
    
        let xScale = d3.scaleBand()
            .domain(this.keys)
            .rangeRound([0, this.width]);

        this.chart = d3.select('#root')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
        
        this.createBars(xScale, yScale);  
        this.createAxis(xScale, yScale);   
    }

    createBars(xScale, yScale){
        let barContainer = this.chart.selectAll('g')
                    .data(this.values)
                    .enter()
                    .append('g')
                        .attr('class', 'bar')
                        .attr('transform', (d, i) => `translate(${i * xScale.bandwidth()}, 0)`);
        
        barContainer.append('rect')
            .attr('y', d => yScale(d))
            .attr('height', d => this.height - yScale(d))
            .attr('width', xScale.bandwidth() - 2);
        
        barContainer.append('text')
            .attr('x', xScale.bandwidth()/2 - 14)
            .attr('y', d => this.height - 10)
            .text(d => `${d} ˚C`);
    }

    createAxis(xScale, yScale) {
        const axisX = d3.axisBottom(xScale);
        const axisY = d3.axisLeft(yScale);

        this.chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${this.height})`)
            .call(axisX)
            .append('text')
            .attr('class', 'legend')
            .attr('x', this.width / 2)
            .attr('y', 50)
            .text('Time of day')
    }

    ngOnInit() {
        this.createHistrogram();     
    }
}