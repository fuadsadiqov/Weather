import { Injectable } from '@angular/core';
import { SimplesCountryMap } from '../map';

@Injectable({
  providedIn: 'root',
})
export class CountryFilterService {
  private countriesList = Object.entries(SimplesCountryMap.state_specific).map((item) => item);

  filter(input: string, countriesList: any[]): any[] {
    return countriesList.filter((country) => country[1].name.toLowerCase().includes(input.toLowerCase()));
  }

  getCountryById(id: string): any {
    return this.countriesList.find((item) => item[0] == id);
  }

  getCountryName(id: string): string | undefined{
    let country = this.getCountryById(id)
    return country ? country[1].name : undefined 
  }

  currentEightHoursData(countriesList: Array<any>){
    return [
        countriesList.map((item: any) => Math.round(item.main.temp - 273.15)).slice(0, 8),
        countriesList.map((item: any) => item.dt_txt).slice(0, 8)
    ]
  }

}
