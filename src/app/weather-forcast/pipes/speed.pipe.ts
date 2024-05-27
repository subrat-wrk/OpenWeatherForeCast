import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'speed',
  standalone: true,
})
export class SpeedPipe implements PipeTransform {
  transform(value: number): number {
    return Math.floor((value * 3600) / 1000);
  }
}
