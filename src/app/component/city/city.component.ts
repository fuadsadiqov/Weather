import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimplesCountryMap } from '../../map'
import { RestService } from 'src/app/services/rest.service';
import { ChangeDegree } from 'src/convertKelvinToCelcies';
 
// Ng Chart
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  public coutriesList = Object.entries(SimplesCountryMap.state_specific).map(item => item)
  public country: any
  public countryWeather: any
  public allDayWeather: Array<any> = []
  public fiveDayHourlyWeaher: Array<any> = []
  public math = Math
  
  constructor(private route: ActivatedRoute, private restService: RestService, private router: Router){
    this.getWeather()
  }
  getWeather(){
    this.route.params.subscribe(para => {
      const id = para['id']
      this.country = this.coutriesList.find(item => item[0] == id)      
      this.restService.getWeather(this.country[1].name)
      .subscribe((res: any) => {
        this.fiveDayHourlyWeaher = res.list
        let lastEightDayData =  res.list.map((item: any) => Math.round(item.main.temp - 273.15)).slice(0, 8)
        let lastEightDayLabel =  res.list.map((item: any) => item.dt_txt).slice(0, 8)
        this.lineChartData.labels = lastEightDayLabel 
        this.lineChartData.datasets[0].data = lastEightDayData
        this.countryWeather = res.list[0]
        this.allDayWeather = res.list.filter((item: any) => item.dt_txt.substr(-8) == '12:00:00')
        })
      })
  }
  navigateToCity(cityId: string){
    this.router.navigateByUrl('city/' + cityId)
    this.chart?.update()
    this.getWeather()
  }
  changeTime(time: string){
    this.countryWeather = this.allDayWeather.find((item: any) => item.dt_txt == time)
    let lineChartArray = this.fiveDayHourlyWeaher.filter((item: any) => item.dt_txt.substr(8, 2) == time.substring(8, 10))    
    this.lineChartData.labels = lineChartArray.map((item: any) => item.dt_txt)
    this.lineChartData.datasets[0].data = lineChartArray.map((item: any) => Math.round(item.main.temp - 273.15))
    console.log(this.fiveDayHourlyWeaher.map((item: any) => item.main.temp));
    this.chart?.update()
  }
  public chartClicked({ event, active}: { event?: ChartEvent, active?: object[]}): void {
    console.log(event, active);    
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
    
    plugins:
    {
      legend: { display: false },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}