import { Component, ViewChild, OnChanges, SimpleChanges, Input, OnInit } from '@angular/core';
 
// Ng Chart
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges{
  public lineChartType: ChartType = 'line';
  @Input('wrapper') wrapper: Array<any> = []

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  public chartClicked({ event, active}: { event?: ChartEvent, active?: object[]}): void {
    console.log(event, active);    
  }
  ngOnChanges(changes: SimpleChanges): void {
    let inputLineChartData = changes['wrapper'].currentValue[0]
    let inputLineChartLabel = changes['wrapper'].currentValue[1]
    this.lineChartData.datasets[0].data = inputLineChartData 
    this.lineChartData.labels = inputLineChartLabel
    this.chart?.update() 
  }
  // Ng Chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: '#bcad3233',
        borderColor: '#bcad32',
        fill: 'origin',
        datalabels: {
          color: '#FFF'
        }
      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      },
    },
    responsive: true,
    aspectRatio: 5,
    scales: {
      x:{
        ticks: {
          color: "white",
          callback: function(val: any, index) {
            let changedValue: any = this.getLabelForValue(val).substring(10, 16)
            return this.getLabelForValue(changedValue);
          },
        }
      },
      y: {
          beginAtZero: true,
          display: false,
        },
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: 'white',
        display: true,
        font: {
          weight: 'bold'
        },
      }
    },
  };
}
