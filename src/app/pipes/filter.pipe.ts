import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], text: string): any[] {
    
    console.log(text);
    if(text ==='')return arr;

    text = text.toLowerCase();
    return arr.filter(item=>{
      return item.name.toLowerCase()
        .includes(text) || item.surname.toLowerCase()
        .includes(text);
      
    })
  }

}
