import { Injectable } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private restService: RestService) {}

  getWeather(cityName: string) {
    return this.restService.getWeather(cityName);
  }

  filterEightDayWeather(weatherList: any[]): any[] {
    return weatherList.filter((item: any) => item.dt_txt.substr(-8) === '12:00:00');
  }

  getWeatherByTime(time: string, eightDayWeather: any[]): any {
    return eightDayWeather.find((item: any) => item.dt_txt === time);
  }

  getWeatherIndexByTime(time: string, eightDayWeather: any[]): number {
    return eightDayWeather.findIndex((item: any) => item.dt_txt === time);
  }
}
