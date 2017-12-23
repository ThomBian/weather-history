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
    "23":-1
}

const test:number [] = [
    3,4,5,7,8,12,34
]

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear().domain([0, d3.max(test)]).range([0, 340]);


@Component({
    selector: 'histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class Histogram implements OnInit{


        

    ngOnInit() {
        d3.select('#root')
            .selectAll('div')
            .data(test)
                 .enter()
                 .append('div')
                 .attr('class', 'bar')
                 .style('height', d => `${yScale(d)}px`)
                 .text(d => d+'');                     
    }
}