import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { Pipe, PipeTransform } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';


@Pipe({name: 'orderBy'})
export class ExponentialStrengthPipe implements PipeTransform {
  // The pipe's transform method take first Argurment is the data using that 
  // pipe( which is data before the '|' mark in the template), the others 
  // parameter is optional

  // Your sort logic is in here

  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
   
}



@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
}) 

export class ViewtaskComponent implements OnInit {

  constructor(private httpClient: HttpClient, private router: Router,  private route: ActivatedRoute) { }
  objObservable: Observable<any>; 
 
  data: any[];
  taskList: any[];
  keyword: string;
  error: string;

  ngOnInit() { 
     this.LoadTask();
  }

  UpdateTask(id: string) {
   console.log(id); 
    this.router.navigate(['/task/' + id]);

  }


  EndTask(id: string) {
    console.log(id);
    console.log("update Project" + id);
  
      this.httpClient.put("http://localhost:54949/api/endtask/" + id,
      {
        "Status": "C"
      })
      .subscribe(
        data => {
          this.error = "Task status updated sucessfully!";
          console.log("Updated successfully", data);   
          this.ScrollTop();    
        },
        error => {
          console.log("Error", error); 
        }
  
      ); 
 
   }


   
  
  ScrollTop(){
    var scrollStep = -window.scrollY / (15 / 15),
    scrollInterval = setInterval(function(){
    if ( window.scrollY != 0 ) {
        window.scrollBy( 0, scrollStep );
    }
    else clearInterval(scrollInterval); 
   },15);

  }

  DeleteTask (id: string){
    console.log(id);
  }
  

  selectEvent(item, type) {
    // do something with selected item
    console.log(item);  
    
    const params = new HttpParams().set('_page', "1").set('_limit', "1");
    this.httpClient.get<any[]>("http://localhost:54949/api/projectTasks/" + item.Project_ID,
      { params }).subscribe(
        data => {            
          this.taskList = data;
          console.log(this.taskList);
        }         
      ); 


  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  } 
  LoadTask() {

      //To Load Projects  
      this.keyword = 'Project_Name';      
      const params = new HttpParams().set('_page', "1").set('_limit', "1");
      this.httpClient.get<any[]>("http://localhost:54949/api/project",
        { params }).subscribe(
          data => {            
            this.data = data;
            console.log(this.data);
          }         
        ); 


        // Load Task 

        this.httpClient.get<any[]>("http://localhost:54949/api/Tasks",
        { params }).subscribe(
          data => {            
            this.taskList = data;
            console.log(this.taskList);
          }         
        ); 

  } 

}
