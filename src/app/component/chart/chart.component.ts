import { Component, ViewChild, OnChanges, SimpleChanges, Input, OnInit } from '@angular/core';
 
// Ng Chart
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges{
  public lineChartType: ChartType = 'line';
  private backgroundColor: string = ''
  private borderColor: string = ''

  @Input('wrapper') wrapper: Array<any> = []

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  ngOnChanges(changes: SimpleChanges): void {
    let inputLineChartData = changes['wrapper'].currentValue[0]
    let inputLineChartLabel = changes['wrapper'].currentValue[1]
    this.backgroundColor = changes['wrapper'].currentValue[2] 
    this.borderColor = changes['wrapper'].currentValue[2] 
    
    this.lineChartData.datasets[0].data = inputLineChartData 
    this.lineChartData.labels = inputLineChartLabel
    this.lineChartData.datasets[0].backgroundColor = this.backgroundColor ? this.backgroundColor + '33' : '#bcad3233'
    this.lineChartData.datasets[0].borderColor = this.borderColor ? this.borderColor : '#bcad32'
    this.chart?.update() 
  }
  // Ng Chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        backgroundColor: '',
        borderColor: '',
        fill: 'origin',
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
    maintainAspectRatio: false,
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
    },
  };
} 