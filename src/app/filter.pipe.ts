import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({name: 'filterme'})
export class FilterPipe  implements PipeTransform { 

  transform(array: any[], filter: any) {
    console.log(filter); 
    console.log(array); 
    if (array){
      
      return filter 
      ? array.filter(item => item.Project_Name.indexOf(filter) !== -1)
      : array;
    /*  if (filter){
        return array.filter((obj) => obj.Project_Name === filter);
      }else{
        return array;
      }      */
    } 
  }
}