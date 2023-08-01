import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SimplesCountryMap } from '../../map'
import { RestService } from 'src/app/services/rest.service';
import { Location } from '@angular/common';
import { CountryFilterService } from 'src/app/services/country-filter.service';
import { ChartDataService } from 'src/app/services/chart-data.service';
import { WeatherService } from 'src/app/services/weather.service';

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
    private countryFilterService: CountryFilterService, 
    private chartDataService: ChartDataService,
    private weatherService: WeatherService,
    private router: Router,
    private location: Location){
    this.getWeather()
    // if(!localStorage.getItem('apiKey')){
    //   this.router.navigateByUrl('')
    // } 
   }
  public goBack(){
    this.location.back()
  }
  public filterCountry(){
    this.filteredCounties = this.countryFilterService.filter(this.filteredInput, this.coutriesList)
  }
  private getWeather(){
    this.route.params.subscribe(para => {
      const id = para['id']
      this.country = this.countryFilterService.getCountryById(id)
      this.filteredInput = this.countryFilterService.getCountryName(id) || ''
      this.restService.getWeather(this.country[1].name)
      .subscribe((res: any) => {
        this.fiveDayHourlyWeaher = res.list
        this.todayWeather = res.list[0]
        this.chartDataAndLabels = this.countryFilterService.currentEightHoursData(res.list)
        this.eightDayWeather = this.weatherService.filterEightDayWeather(res.list)
        })
      })
  }
  private navigateToCity(cityId: string){
    this.router.navigateByUrl('city/' + cityId)
    this.getWeather()
  }
  public changeTime(time: string){
    this.todayWeather = this.weatherService.getWeatherByTime(time, this.eightDayWeather)
    this.countryWeatherIndex = this.weatherService.getWeatherIndexByTime(time, this.eightDayWeather)
    this.chartDataAndLabels = this.chartDataService.getChartDataForTime(this.fiveDayHourlyWeaher, time)
  }
 
  public changeWeatherMod(param: string){
    const [mod, color] = param.split(',')
    let startIndex = this.countryWeatherIndex * 8
    let endIndex = startIndex + 8 
    this.chartDataAndLabels = this.chartDataService.getChartDataByMod(this.fiveDayHourlyWeaher, mod, startIndex, endIndex, color)
  }
}