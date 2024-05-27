import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ForecastService } from '../../services/forcast.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchForm: FormGroup;
  weather!: string;

  @Output() onSearch = new EventEmitter<string>();

  private forecastService = inject(ForecastService);
  private formBuilder = inject(FormBuilder);

  get searchInputControl() {
    return this.searchForm.get('searchInput');
  }

  constructor() {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });

    this.searchInputControl!.valueChanges.pipe
    // debounceTime(300),
    // distinctUntilChanged(),
    // switchMap((city) => this.forecastService.getWeather(city)),
    // map((r: any) => r.list)
      ()
      .subscribe({
        next: (res: string) => {
          console.log(res);
          this.onSearch.emit(res);
        },
        error: (err) =>
          console.log(
            `Can't get weather. Error code: %s, URL: %s`,
            err.message,
            err.url
          ),
      });
  }
}
