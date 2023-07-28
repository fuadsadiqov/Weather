import { Component } from '@angular/core';
import { SimplesCountryMap } from '../../map'
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss', '../main-page/main-page.component.scss']
})
export class ListPageComponent {
  
  public countriesList = Object.entries(SimplesCountryMap.state_specific).map(item => item)
  public filteredCountriesList: Array<any> = this.countriesList
  public searchInput: string = ''

  constructor(private router: Router){
    if(!localStorage.getItem('apiKey')){
      this.router.navigateByUrl('')
    }
  }

  filterCountries(){
    this.filteredCountriesList = this.countriesList.filter(item => item[1].name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase()))
  }
  resetFilter(){
    this.filteredCountriesList = this.countriesList
    this.searchInput = ''
  }

}
