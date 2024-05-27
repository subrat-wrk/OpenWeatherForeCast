import { Pipe, PipeTransform } from '@angular/core';
import { constants } from '../../constant';

@Pipe({
  name: 'constants',
})
export class ConstantsPipe implements PipeTransform {
  public transform(value: string, args?: any): any {
    if (value in constants) {
      return constants[value];
    }
  }
}
