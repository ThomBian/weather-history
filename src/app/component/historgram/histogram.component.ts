import { Component, OnChanges, OnInit, ViewEncapsulation, Input } from '@angular/core';

import *  as d3 from 'd3';

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear().range([0, 340]);

@Component({
    selector: 'histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class Histogram implements OnChanges, OnInit {

    margin = {
        top: 20,
        bottom: 90,
        right: 10,
        left: 50
    }
    width:number = 1400 - this.margin.left - this.margin.right;
    height:number = 500 - this.margin.top - this.margin.bottom;

    @Input()
    data:{} = {};

    values: number[] = [];
    keys: any[] = [];
    
    createHistrogram() {
        this.values = Object.values(this.data).map(Number);
        this.keys = Object.keys(this.data);

        const yDomain = Math.max(Math.abs(d3.min(this.values)), Math.abs(d3.max(this.values)));
        const yScale = d3.scaleLinear()
            .domain([-yDomain, yDomain])
            .range([this.height, 0]); // [height, 0] due to top left corner reference in svg
    
        const xScale = d3.scaleBand()
            .domain(this.keys)
            .range([0, this.width]);

        const axisX = d3.axisBottom(xScale);
        const axisY = d3.axisLeft(yScale);
        
        let chart = d3.select('#root')

        let barsContainer = chart.select('.offset-container');

        let bars = barsContainer.selectAll('.bar')
            .data(this.values);

        // to remove 
        bars.exit().transition().remove();

        // to create
        let bar = bars.enter().append('g')
                    .attr('class', 'bar')
                    .attr('transform', (d, i) => `translate(${i * xScale.bandwidth()}, 0)`);

        bar.append('rect')
            .attr('y', d => yScale(Math.max(0 ,d)))
            .attr('height', d => Math.abs(yScale(d) - yScale(0)))
            .attr('width', xScale.bandwidth() - 1);

        bar.append('text')
            .attr('x', xScale.bandwidth()/2 - 8)
            .attr('y', d => this.height - this.margin.bottom)
            .text(d => `${d}˚`);

        // to update
        bars.attr('transform', (d, i) => `translate(${i * xScale.bandwidth()}, 0)`);

        bars.select('rect')
           .transition()
           .duration(700)
           .attr('y', d => yScale(Math.max(0 ,d)))
           .attr('height', d => Math.abs(yScale(d) - yScale(0)))
           .attr('width', xScale.bandwidth() - 1);
        
        bars.select('text')
           .attr('x', xScale.bandwidth()/2 - 8)
           .attr('y', d => this.height - this.margin.bottom)
           .text(d => `${d}˚`);
        
        chart.selectAll('g.x.axis').call(axisX);
        chart.selectAll('g.y.axis')
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .call(axisY);
    }


    createAxis(xScale, yScale) {

    }

    ngOnChanges() {
        this.createHistrogram();     
    }

    ngOnInit() {
        let chart = d3.select('#root')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        
        chart.append('g')
            .attr('class', 'offset-container')
            .attr('transform', `translate(${this.margin.left + 2}, 0)`)
        
        //let container = d3.select('#root .offset-container');
        
        chart.append('g')
            .attr('class', 'y axis');
        chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(${this.margin.left}, ${this.height})`)
            .append('text')
            .attr('class', 'legend')
            .attr('x', this.width / 2)
            .attr('y', 50)
            .text('Time of day');
    }
}