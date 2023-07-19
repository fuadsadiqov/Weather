import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private restService: RestService){
    this.route.params.subscribe(para => {
      const id = para['id']
      this.country = this.coutriesList.find(item => item[0] == id)      
      this.restService.getWeather(this.country[1].name)
      .subscribe(res => {
        this.countryWeather = res
        console.log(res)
      })
    })
  }
}
