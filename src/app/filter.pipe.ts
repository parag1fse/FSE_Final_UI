import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({name: 'filterme'})
export class FilterPipe  implements PipeTransform { 

  transform(array: any[], filter: string) {
    console.log(array); 
    if (array){
      
      if (!filter){
        return array;
      }else{
        return array.filter((obj) => obj.First_Name === filter);
      }      
    } 
  }
}