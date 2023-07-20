import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/forecast?appid=30b99eebbcd8bad62670dff478c45de9&q='
  private checkingUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q=baku&appid='
  
  constructor(private http: HttpClient){ }
  getWeather(city: string): Observable<Object>{
    return this.http.get(this.baseUrl + city)
  }
  checkApi(apiKey: string){
    return this.http.get(this.checkingUrl + apiKey)
  }
}