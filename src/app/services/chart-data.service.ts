import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  getChartData(weatherList: any[]): any {
    let todayEightHoursDatas = weatherList
      .map((item: any) => Math.round(item.main.temp - 273.15))
      .slice(0, 8);
    let todayEightHoursLabels = weatherList.map((item: any) => item.dt_txt).slice(0, 8);
    return [todayEightHoursDatas, todayEightHoursLabels];
  }

  getChartDataForTime(weatherList: any[], time: string): any {
    let lineChartArray = weatherList.filter((item: any) => item.dt_txt.substr(8, 2) === time.substring(8, 10));
    return [
      lineChartArray.map((item: any) => Math.round(item.main.temp - 273.15)),
      lineChartArray.map((item: any) => item.dt_txt),
    ];
  }

  getChartDataByMod(weatherList: any[], mod: string, startIndex: number, endIndex: number, color: string): any {
    return [
      weatherList
        .map((item: any) => Math.round(item.main[mod] - 273.15))
        .slice(startIndex, endIndex),
      weatherList.map((item: any) => item.dt_txt).slice(startIndex, endIndex),
      color,
    ];
  }
}
