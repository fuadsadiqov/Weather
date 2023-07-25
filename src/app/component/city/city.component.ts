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
  public boxClosed: boolean | string = ''
  public inputClicked: boolean | string = ''
  private countryWeatherIndex: number = 0

  @ViewChild('searchResult',  {read: ElementRef}) searchResult!: ElementRef<any>;   
  @ViewChild('search',  {read: ElementRef}) searchInput!: ElementRef<any>;   

  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    this.boxClosed = event.composedPath().includes(this.searchResult.nativeElement);
    this.inputClicked = event.composedPath().includes(this.searchInput.nativeElement);
  }
  constructor(private route: ActivatedRoute, private restService: RestService, private router: Router){
    this.getWeather()
    if(!localStorage.getItem('apiKey')){
      this.router.navigateByUrl('')
    }
    
  }
  getDayName(dateStr: string, locale: string){
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });          
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
    this.countryWeatherIndex = this.allDayWeather.findIndex((item: any) => item.dt_txt == time)
    console.log(this.countryWeatherIndex);
    
    let lineChartArray = this.fiveDayHourlyWeaher.filter((item: any) => item.dt_txt.substr(8, 2) == time.substring(8, 10))    
    this.chartDataAndLabels = [lineChartArray.map((item: any) => Math.round(item.main.temp - 273.15)), lineChartArray.map((item: any) => item.dt_txt)] 
  }
 
  changeWeatherMod(param: string, color: string){
    let startIndex = this.countryWeatherIndex * 8
    let endIndex = startIndex + 8
    this.chartDataAndLabels = [this.fiveDayHourlyWeaher.map((item: any) => Math.round(item.main[param] - 273.15)).slice(startIndex, endIndex), this.fiveDayHourlyWeaher.map((item: any) => item.dt_txt).slice(startIndex, endIndex), color]
  }
  changeTemprature(){
    let parametr = ['temp', '#bcad32']
    this.changeWeatherMod(parametr[0], parametr[1])
  }
  changeFeels(){
    let parametr = ['feels_like', '#bcad32']
    this.changeWeatherMod(parametr[0], parametr[1])
  }
  changeHumidity(){
    let parametr = ['humidity', '#FFFFFF']
    this.changeWeatherMod(parametr[0], parametr[1])
  }
  changeWind(){
    let parametr = ['pressure', '#96b2e4']
    this.changeWeatherMod(parametr[0], parametr[1])
  }
}