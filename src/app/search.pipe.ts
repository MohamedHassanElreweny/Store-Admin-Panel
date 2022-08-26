import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:any[], term:string): any[] {
    return products.filter(item=>item.name.toLowerCase().includes(term.toLowerCase()));
  }

}
