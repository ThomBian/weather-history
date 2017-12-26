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
        top: 40,
        bottom: 90,
        right: 10,
        left: 15
    }
    width:number = 1000 - this.margin.left - this.margin.right;
    height:number = 400 - this.margin.top - this.margin.bottom;

    @Input()
    chosenDate:string;

    @Input()
    data:{} = {};

    values: number[] = [];
    keys: any[] = [];
    
    createHistrogram() {
        // init scales, data, axis based on the data
        this.values = Object.values(this.data).map(Number);
        this.keys = Object.keys(this.data);

        const yDomain = Math.max(Math.abs(d3.min(this.values)), Math.abs(d3.max(this.values)));
        const yScale = d3.scaleLinear()
            .domain([-yDomain - 1 , yDomain + 1])
            .range([this.height - this.margin.top, 0]); // [height, 0] due to top left corner reference in svg
    
        const xScale = d3.scaleBand()
            .domain(this.keys)
            .range([0, this.width]);

        // filter ticks : 1 on 2 hours
        const tickValues = this.keys.reduce((acc, curV, curI) => {
            if (curI % 2 === 0){
                acc.push(curV);
            }
            return acc;
        }, []);

        // apply tick filter if necessary
        const axisX = d3.axisBottom(xScale).tickValues(this.keys.length > 24 ? tickValues : this.keys);
        const axisY = d3.axisLeft(yScale);

        // y(0) line 
        const lineData = [{x: xScale(this.keys[0]), y: yScale(0)},
                          {x: xScale(this.keys[this.keys.length - 1]) + + xScale.bandwidth(), y: yScale(0)}];
        
        d3.select('#zero-line')
            .append('line')
            .attr('x1', lineData[0].x)
            .attr('y1', lineData[0].y)
            .attr('x2', lineData[1].x)
            .attr('y2', lineData[1].y)
            .attr("stroke-width", 1)
            .attr("stroke", "#2196F3");;
        
        d3.select('#temp-info').text('');

        // histogram building
        let chart = d3.select('#root');
        let barsContainer = chart.select('.offset-container');
        let bars = barsContainer.selectAll('.bar')
            .data(this.values);

        // remove useless bars
        bars.exit().transition().remove();

        // create new bars
        let bar = bars.enter().append('g')
                    .attr('class', 'bar')
                    .attr('transform', (d, i) => `translate(${i * xScale.bandwidth()}, 0)`)
                    .on('mouseover', d => {
                        d3.select('#temp-info').text(`Temp: ${d} ˚C`);
                    });

        bar.append('rect')
            .attr('y', d => yScale(Math.max(0 ,d)))
            .attr('height', d => Math.abs(yScale(d) - yScale(0)))
            .attr('width', xScale.bandwidth() - 1);

        // update existing ones
        bars.attr('transform', (d, i) => `translate(${i * xScale.bandwidth()}, 0)`);

        bars.select('rect')
           .transition()
           .duration(700)
           .attr('y', d => yScale(Math.max(0 ,d)))
           .attr('height', d => Math.abs(yScale(d) - yScale(0)))
           .attr('width', xScale.bandwidth() - 1);
        
        // update legends and axis 
        barsContainer.selectAll('g.x.axis').call(axisX);
        barsContainer.selectAll('g.y.axis')
            .call(axisY);
        
        chart.select('#dateInfo')
             .transition()
             .duration(700)
             .text(this.chosenDate);
    }

    ngOnChanges() {
        this.createHistrogram();     
    }

    ngOnInit() {
        // responsive histogram
        const vBox = Math.max(this.width+this.margin.left+this.margin.right,
                              this.height+this.margin.top+this.margin.bottom);
        let chart = d3.select('#root')
            .attr("width", '100%')
            .attr("height", '100%')
            .attr('viewBox',`0 0 ${vBox} ${vBox}`)
            .attr('preserveAspectRatio','xMinYMin')
        
        // UI container
        chart.append('g')
             .attr('class', 'offset-container')
             .attr('transform', `translate(${this.margin.left + 2}, ${this.margin.top})`)
        
        let container = d3.select('#root .offset-container');
     
        // axis X
        container.append('g')
            .attr('class', 'y axis');

        // axis Y
        container.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${this.height - this.margin.top})`)
            .append('text')
            .attr('class', 'legend')
            .attr('x', this.width / 2)
            .attr('y', 50)
            .text('Time of day');
        
        // temperature on hover
        container.append('g')
            .attr('transform', `translate(${this.margin.left - 5}, 0)`)
            .append('text')
            .attr('id', 'temp-info');
        
        // picked date
        container.append('g')
            .append('text')
            .attr('id', 'dateInfo')
            .attr('transform', `translate(${this.width - this.margin.right - 100}, 0)`)
            .text('Yesterday');
        
        container.append('g')
            .attr('id', 'zero-line');
    }
}