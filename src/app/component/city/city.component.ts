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

  constructor(private route: ActivatedRoute, private restService: RestService, private router: Router){
    this.route.params.subscribe(para => {
      const id = para['id']
      this.country = this.coutriesList.find(item => item[0] == id)      
      this.restService.getWeather(this.country[1].name)
      .subscribe((res: any) => {
        
        // res.list = res.list.map((item: any) => item.main.temp = Math.round(item.main.temp - 273.15))
        

        this.lineChartData.labels = res.list.map((item: any) => item.dt).slice(-8)
        this.lineChartData.datasets[0].data = res.list.map((item: any) => item.main.temp).slice(-8)
        this.countryWeather = res.list[0]

        this.countryWeather.main.temp = Math.round(this.countryWeather.main.temp - 273.15)
      })
      })
  }
  navigateToCity(cityId: string){
    this.router.navigateByUrl('city/' + cityId)
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
    labels: [ ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      },
    },
    responsive: true,
    aspectRatio: 4,
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