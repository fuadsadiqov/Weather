import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimplesCountryMap } from '../../map'
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  public coutriesList = Object.entries(SimplesCountryMap.state_specific).map(item => item)
  public country: any = []
  public countryWeather: any = false
  public allDayWeather: Array<any> = []
  public fiveDayHourlyWeaher: Array<any> = []
  public chartDataAndLabels: any
  public math = Math
  public filteredInput: string = ''
  public filteredCounties: Array<any> = []
  public isInside: boolean = false

  @ViewChild('searchResult',  {read: ElementRef}) element!: ElementRef<any>;   

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    this.isInside = event.composedPath().includes(this.element.nativeElement);    
  }
  constructor(private route: ActivatedRoute, private restService: RestService, private router: Router){
    this.getWeather()
    if(!localStorage.getItem('apiKey')){
      this.router.navigateByUrl('')
    }    
  }
  filterCountry(){
    this.filteredCounties = this.coutriesList.filter(country => country[1].name.toLowerCase().includes(this.filteredInput.toLowerCase()))
  }
  getWeather(){
    this.route.params.subscribe(para => {
      const id = para['id']
      this.country = this.coutriesList.find(item => item[0] == id)
      this.filteredInput = this.country[1].name
            
      this.restService.getWeather(this.country[1].name)
      .subscribe((res: any) => {
        this.fiveDayHourlyWeaher = res.list
        let lastEightDayData =  res.list.map((item: any) => Math.round(item.main.temp - 273.15)).slice(0, 8)
        let lastEightDayLabel =  res.list.map((item: any) => item.dt_txt).slice(0, 8)
        this.chartDataAndLabels = [lastEightDayData, lastEightDayLabel]
        this.countryWeather = res.list[0]
        this.allDayWeather = res.list.filter((item: any) => item.dt_txt.substr(-8) == '12:00:00')
        })
      })
  }
  navigateToCity(cityId: string){
    this.router.navigateByUrl('city/' + cityId)
    this.getWeather()
  }
  changeTime(time: string){
    this.countryWeather = this.allDayWeather.find((item: any) => item.dt_txt == time)
    let lineChartArray = this.fiveDayHourlyWeaher.filter((item: any) => item.dt_txt.substr(8, 2) == time.substring(8, 10))    
    this.chartDataAndLabels = [lineChartArray.map((item: any) => Math.round(item.main.temp - 273.15)), lineChartArray.map((item: any) => item.dt_txt)] 
    console.log(this.fiveDayHourlyWeaher.map((item: any) => item.main.temp));
  }
}