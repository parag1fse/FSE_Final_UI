import { Component, OnInit, Pipe } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})


export class TaskComponent implements OnInit {
  
  id: any;
  project_id: string;
  parent_task_id: string;
  priority: string;
  startdate : string;
  enddate: string;
  user:string;
  taskname: string;
  error: string;
  taskDetail: any;

  isEdit = false;
  btnText: string;
  Status: string;


  keyword: string;
  data: any[];

  keywordt: string;
  datat: any[];

  keywordu: string;
  datau: any[];

  para: any[];

  constructor(private httpClient: HttpClient, private router: Router) { }
  objObservable: Observable<any>; 
 
 


  selectEvent(item, type) {
    // do something with selected item
    console.log(item);
   

    if (type =="project"){
      console.log(type);
      console.log(item.Project_ID);
      this.project_id = item.Project_ID;
      console.log(this.project_id);
    
    } else if (type =="user"){
      console.log(type);
      console.log(item.User_ID);
      this.user = item.User_ID;
      console.log(this.user);

    } else if (type =="parent"){
      console.log(type);
      console.log(item.Parent_ID);
      this.parent_task_id = item.Parent_ID;
      console.log(this.parent_task_id);
    }

  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
  } 


  ngOnInit() {   

    this.para = this.router.url.split("/");

    if (this.para[2]){
      this.id = this.para[2];
      this.isEdit = true;

    } else {
      this.isEdit = false;
    }
    console.log(this.isEdit);

     //To Load Projects  
    this.keyword = 'Project_Name';      
    const params = new HttpParams().set('_page', "1").set('_limit', "1");
    this.httpClient.get<any[]>("http://localhost:54949/api/project",
      { params }).subscribe(
        data => {            
          this.data = data;
          console.log("All Project");
          console.log(this.data);
        }         
      );

    //To Load Users  
    this.keywordu = 'First_Name';          
    this.httpClient.get<any[]>("http://localhost:54949/api/users",
      { params }).subscribe(
        data => {       
          console.log("All Users");     
          this.datau = data;
          console.log(this.datau);
        }         
      );


      //To Load Parent Task  
    this.keywordt = 'Parent_Task';          
    this.httpClient.get<any[]>("http://localhost:54949/api/ParentTask",
      { params }).subscribe(
        data => {    
          console.log("All Parent_Task");
          this.datat = data;
          console.log(this.datat);
        }         
      );

      this.btnText = "Add";
        //Reload data for Edit mode
        if (this.isEdit){
          this.btnText = "Update";
          
          this.httpClient.get<any[]>("http://localhost:54949/api/tasks/" + this.id,
          { params }).subscribe(
            data => {            
              this.taskDetail = data; 
              
              console.log(this.data);
              this.id = this.taskDetail.Task_ID;
              this.user = this.taskDetail.User_ID;
              this.parent_task_id = this.taskDetail.Parent_ID;
              this.project_id =this.taskDetail.Project_ID;
              this.priority =this.taskDetail.Priority;
              this.startdate = this.StringToDate(this.taskDetail.Start_Date).toString();
              this.enddate=  this.StringToDate(this.taskDetail.End_Date).toString();  
              this.taskname =this.taskDetail.Task_Name;
              this.Status = this.taskDetail.Status;
            }         
          );    

        }

  } 

 StringToDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('/');
}

 

  AddTask(){

    console.log("Task details"); 

    console.log(this.user);
    console.log(this.parent_task_id);
    console.log(this.project_id);
    console.log(this.priority);
    console.log(this.startdate);
    console.log(this.enddate);
    console.log(this.taskname);

    if(this.isEdit){

      //Get Records from table
      const params = new HttpParams().set('_page', "1").set('_limit', "1");
      this.httpClient.get<any[]>("http://localhost:54949/api/tasks/" + this.id,
          { params }).subscribe(
            data => {            
              this.taskDetail = data;                
              this.id = this.taskDetail.Task_ID;
              this.user = this.taskDetail.User_ID;
              this.parent_task_id = this.taskDetail.Parent_ID;
              this.project_id =this.taskDetail.Project_ID;
              this.priority =this.taskDetail.Priority;
              this.startdate = this.taskDetail.Start_Date;
              this.enddate=  this.taskDetail.End_Date;
              this.taskname =this.taskDetail.Task_Name;
              this.Status = this.taskDetail.Status;
            }         
          );  


      this.httpClient.put("http://localhost:54949/api/tasks/" + this.id,
      {
        "Parent_ID": this.parent_task_id, 
        "Task_name": this.taskname,
        "Start_Date": this.startdate,
        "End_Date": this.enddate,
        "Priority": this.priority, 
        "User_ID": this.user,
        "Task_ID": this.id,
        "Status": this.Status,
        "Project_ID": this.project_id
      })
      .subscribe(
        data => {
          console.log("Task Updated Successfully ", data);   
          this.router.navigate(['/viewtask/']); 
  
        },
        error => {
          console.log("Error", error);
          this.error = "Error in Task Update";
        }
  
      );  

    } else {

      this.httpClient.post("http://localhost:54949/api/tasks",
      {
        "Parent_ID": this.parent_task_id,
        "Project_ID": this.project_id,
        "Task_name": this.taskname,
        "Start_Date": this.startdate,
        "End_Date": this.enddate,
        "Priority": this.priority,
        "Status": "I",
        "User_ID": this.user
      })
      .subscribe(
        data => {
          console.log("Added New Task", data);       
          
          this.user = "";
          this.parent_task_id = "";
          this.project_id = "";
          this.priority = "0";
          this.startdate = "";
          this.enddate = "";
          this.taskname = ""; 
          this.router.navigate(['/viewtask/']); 
  
        },
        error => {
          console.log("Error", error);
          this.error = "Error in Adding Task";
        }
  
      );  
    }
   
  } 
 

}
