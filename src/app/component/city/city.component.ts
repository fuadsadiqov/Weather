import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimplesCountryMap } from '../../map'
import { RestService } from 'src/app/services/rest.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  public coutriesList = Object.entries(SimplesCountryMap.state_specific).map(item => item)
  public country: any = []
  public todayWeather: any = false
  public eightDayWeather: Array<any> = []
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
  constructor(
    private route: ActivatedRoute, 
    private restService: RestService, 
    private router: Router,
    private location: Location){
    this.getWeather()
    // if(!localStorage.getItem('apiKey')){
    //   this.router.navigateByUrl('')
    // } 
  }
  
  goBack(){
    this.location.back()
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
        let todayEightHoursDatas =  res.list.map((item: any) => Math.round(item.main.temp - 273.15)).slice(0, 8)
        let todayEightHoursLabels =  res.list.map((item: any) => item.dt_txt).slice(0, 8)
        this.chartDataAndLabels = [todayEightHoursDatas, todayEightHoursLabels]
        this.todayWeather = res.list[0]
        this.eightDayWeather = res.list.filter((item: any) => item.dt_txt.substr(-8) == '12:00:00')
        })
      })
  }
  navigateToCity(cityId: string){
    this.router.navigateByUrl('city/' + cityId)
    this.getWeather()
  }
  changeTime(time: string){
    this.todayWeather = this.eightDayWeather.find((item: any) => item.dt_txt == time)
    this.countryWeatherIndex = this.eightDayWeather.findIndex((item: any) => item.dt_txt == time)
    
    let lineChartArray = this.fiveDayHourlyWeaher.filter((item: any) => item.dt_txt.substr(8, 2) == time.substring(8, 10))    
    this.chartDataAndLabels = [lineChartArray.map((item: any) => Math.round(item.main.temp - 273.15)), lineChartArray.map((item: any) => item.dt_txt)] 
  }
 
  changeWeatherMod(param: string){
    const [mod, color] = param.split(',')
    let startIndex = this.countryWeatherIndex * 8
    let endIndex = startIndex + 8
    this.chartDataAndLabels = [this.fiveDayHourlyWeaher.map((item: any) => Math.round(item.main[mod] - 273.15))
    .slice(startIndex, endIndex), 
    this.fiveDayHourlyWeaher.map((item: any) => item.dt_txt)
    .slice(startIndex, endIndex), color]
  }
}