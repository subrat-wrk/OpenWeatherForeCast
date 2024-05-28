import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { SearchComponent } from './weather-forcast/components/search/search.component';
import { Cities, LoadingStatus } from './constant';
import { CommonModule, NgFor } from '@angular/common';
import { ListViewComponent } from './weather-forcast/components/list-view/list-view.component';
import { ForecastService } from './weather-forcast/services/forcast.service';
import { DayForecast, Forecast, Weather } from './models/weather.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchComponent,
    NgFor,
    CommonModule,
    ListViewComponent,
  ],
  template: `
    <div class="container-fluid">
      <div class="row mt-4">
        <ul class="list-group list-group-horizontal justify-content-center">
          <li
            *ngFor="let city of cities$ | async"
            class="list-group-item active"
            [ngClass]="{ active: activeCity === city.name }"
            attr.aria-current="{{ activeCity === city.name }}"
          >
            <button
              type="button"
              class="btn shadow-none"
              (click)="getWeatherForecast(city.name)"
            >
              {{ city.name }}
            </button>
          </li>
        </ul>
        <!-- <app-search
          class="mt-4"
          (onSearch)="setWeatherForecastList($event)"
        ></app-search> -->
        <ng-container *ngIf="LoadingStatus === LoadingStatusConstant.IDLE">
          <p class="d-flex justify-content-center mt-5">
            Please select a city to know the forecast.
          </p>
        </ng-container>
        <ng-container *ngIf="LoadingStatus === LoadingStatusConstant.SUCCESS">
          <app-list-view [data]="weatherForecastList"></app-list-view>
        </ng-container>
        <ng-container *ngIf="LoadingStatus === LoadingStatusConstant.ERROR">
          <p class="alert alert-danger" role="alert">
            Error while fetching data
          </p>
        </ng-container>
        <ng-container *ngIf="LoadingStatus === LoadingStatusConstant.LOADING">
          <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status" aria-live="polite">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  weatherForecastList!: { [key: string]: DayForecast };
  private searchSubject = new Subject();
  private forecastSubject = new Subject();
  LoadingStatus = LoadingStatus.IDLE;
  constructor() {}
  cities$ = of(Cities);
  activeCity = '';
  public LoadingStatusConstant = LoadingStatus;
  private forecastService = inject(ForecastService);
  destroyRef = inject(DestroyRef);
  ngOnInit() {
    this.forecastSubject
      .pipe(
        distinctUntilChanged(),
        tap(() => {
          this.LoadingStatus = LoadingStatus.LOADING;
        }),
        switchMap((city: any) =>
          this.forecastService.getWeather(city).pipe(
            catchError(() => {
              return of({ list: [] });
            })
          )
        ),
        map((r: any) => r.list),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (list: Forecast[]) => {
          console.log(list);
          if (!list || (list && list.length === 0)) {
            this.weatherForecastList = {};
          } else {
            this.weatherForecastList =
              this.forecastService.getForecastByDay(list);
          }

          this.LoadingStatus = LoadingStatus.SUCCESS;
        },
        error: () => {
          this.LoadingStatus = LoadingStatus.ERROR;
        },
        complete: () => {},
      });
    // Needed only for search
    // this.searchSubject
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged(),
    //     switchMap((city: any) => this.forecastService.getWeather(city)),
    //     map((r: any) => r.list)
    //   )
    //   .subscribe({
    //     next: (list) => {
    //       this.weatherForecastList =
    //         this.forecastService.getForecastByDay(list);
    //       this.LoadingStatus = LoadingStatus.SUCCESS;
    //     },
    //     error: () => {
    //       this.LoadingStatus = LoadingStatus.ERROR;
    //     },
    //     complete: () => {
    //       this.LoadingStatus = LoadingStatus.SUCCESS;
    //     },
    //   });
  }

  getWeatherForecast(cityName: string) {
    this.activeCity = cityName;
    this.forecastSubject.next(cityName);
  }

  // Need only for search
  // setWeatherForecastList(city: any) {
  //   this.LoadingStatus = LoadingStatus.LOADING;
  //   this.searchSubject.next(city);
  // }
}
