import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimplesCountryMap } from '../../map'
import { RestService } from 'src/app/services/rest.service';

// Ng Chart
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
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
  public currentIndex: number = 1
  public dailyWeatherWrapper: Array<any> = []

  constructor(private route: ActivatedRoute, private restService: RestService, private router: Router){
    this.getWeather()
  }
  getWeather(){
    this.route.params.subscribe(para => {
      const id = para['id']
      this.country = this.coutriesList.find(item => item[0] == id)      
      this.restService.getWeather(this.country[1].name)
      .subscribe((res: any) => {
        console.log(res);        
        res.list.filter((item: any) => {
          if(item.dt_txt.substr(-8) == '00:00:00'){
            this.dailyWeatherWrapper = [...this.dailyWeatherWrapper, item] 
          }
        })
        this.lineChartData.labels = res.list.map((item: any) => item.dt).slice(res.list, this.currentIndex * 8)
        this.lineChartData.datasets[0].data = res.list.map((item: any) => item.main.temp).slice(res.list, this.currentIndex * 8)
        this.countryWeather = res.list[0]

        this.countryWeather.main.temp = Math.round(this.countryWeather.main.temp - 273.15)
      })
      })
  }
  navigateToCity(cityId: string){
    this.router.navigateByUrl('city/' + cityId)
    this.chart?.update()
    this.dailyWeatherWrapper = []
    this.getWeather()
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
      y: {
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