import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather?appid=30b99eebbcd8bad62670dff478c45de9&q='
  
  constructor(private http: HttpClient){ }
  getWeather(city: string): Observable<Object>{
    return this.http.get(this.baseUrl + city)
  }
}