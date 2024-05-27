import { CommonModule, DatePipe, NgFor, NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { SpeedPipe } from '../../pipes/speed.pipe';
import { DayForecast } from '../../../models/weather.model';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, NgFor, DatePipe, SpeedPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.scss',
})
export class ListViewComponent {
  @Input({ required: true }) data!: { [key: string]: DayForecast };
}
