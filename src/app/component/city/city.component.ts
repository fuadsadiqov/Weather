import { Component } from '@angular/core';
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
  public country: any
  public countryWeather: any

  constructor(private route: ActivatedRoute, private restService: RestService, private router: Router){
    this.route.params.subscribe(para => {
      const id = para['id']
      this.country = this.coutriesList.find(item => item[0] == id)      
      this.restService.getWeather(this.country[1].name)
      .subscribe(res => {
        this.countryWeather = res
        console.log(res)
        this.convertUnixToTimeSunrise(this.countryWeather.sys.sunrise)
        this.convertUnixToTimeSunset(this.countryWeather.sys.sunset)
        this.countryWeather.main.temp -= 273.15
        })
      })
  }
  navigateToCity(cityId: string){
    this.router.navigateByUrl('city/' + cityId)
  }
  convertUnixToTimeSunrise(unix: any){
    let unix_timestamp = unix;
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    this.countryWeather.sys.sunrise = formattedTime;
  }
  convertUnixToTimeSunset(unix: any){
    let unix_timestamp = unix;
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    this.countryWeather.sys.sunset = formattedTime;
  }
}