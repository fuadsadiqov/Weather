import { Component } from '@angular/core';
import { SimplesCountryMap } from '../../map'
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  public countriesList = Object.entries(SimplesCountryMap.state_specific).map(item => item)
  public filteredCountriesList: Array<any> = this.countriesList
  public searchInput: string = ''

  constructor(){}

  filterCountries(){
    this.filteredCountriesList = this.countriesList.filter(item => item[1].name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase()))
  }
  resetFilter(){
    this.filteredCountriesList = this.countriesList
    this.searchInput = ''
  }
}