import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseWeatherURL, urlSuffix } from '../../constant';
import { EMPTY, catchError, of, delay, tap, Observable } from 'rxjs';
import { Forecast, Weather, DayForecast } from '../../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<Weather> {
    return this.http.get<Weather>(baseWeatherURL + city + urlSuffix).pipe(
      delay(500), // TO REMOVE
      catchError((err) => {
        if (err.status === 404) {
          console.log(`City ${city} not found`);
        }
        throw new Error(err);
      })
    );
  }

  getForecastByDay(list: Forecast[]): { [key: string]: DayForecast } {
    return list.reduce(
      (acc: { [key: string]: DayForecast }, item: Forecast) => {
        const dt = item.dt_txt.split(' ')[0];
        if (Object.keys(acc).length > 4) {
          return acc;
        }
        if (acc[dt]) {
          const max = Math.max(acc[dt].max, item.main.temp);
          const min = Math.min(acc[dt].min, item.main.temp);
          acc[dt] = { ...acc[dt], max, min };
        } else {
          const max = item.main.temp;
          const min = item.main.temp;
          acc[dt] = {
            max,
            min,
            icon: item.weather[0].icon,
            description: item.weather[0].description,
            windSpeed: item.wind.speed,
          };
        }

        return acc;
      },
      {}
    );
  }
}
