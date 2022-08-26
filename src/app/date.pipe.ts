import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string): string {
    let test=  value?.split('T').slice(0,1).join('');
    return test;
  }

}
