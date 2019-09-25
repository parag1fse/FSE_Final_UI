import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as $ from "jquery";



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  
})
export class ProjectComponent implements OnInit {

  id: any;
  projectName: string;
  setDate: any;
  start_Date: string;
  end_Date: string;
  priority: string;
  manager: string;
  isEdit: any;
  btnText: string;
  selectedRam : any;
 

  error : string;

  managerList: any[];
  projectList: any[];
  projectDetail: any;


  constructor(private httpClient: HttpClient) { }
  objObservable: Observable<any>;

  ngOnInit() {
    this.LoadProjects();

    this.id = 0;
    this.projectName = "";
    this.setDate = "";
    this.start_Date = "";
    this.end_Date = "";
    this.priority = "";
    this.manager = "";

    this.error = "";
    this.btnText = "Add";
    this.isEdit = false;
  }

  ClicMe() {
    console.log(this.projectName);
    this.projectName = "ffffffff";

    this.managerList = [
      { name: "dsfsdf", id: 5 },
      { name: "dsfsdf", id: 5 }
    ]

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

  UpdateProject(obj: any) {
    console.log("update Project" + obj);  

    this.ScrollTop();

    this.id = obj.Project_ID;
    this.projectName = obj.Project_Name;
    if (obj.Start_Date != "") {
      this.setDate = true;

    }else{
      this.setDate = false;
    }
    
    this.start_Date = obj.Start_Date;
    this.end_Date = obj.End_Date;
    this.priority = obj.Priority

    this.btnText = "Update";
    this.isEdit = "true";
    
  }

  SuspendProject(id: string) {
    console.log("Suspend Project" + id);

        this.httpClient.delete("http://localhost:54949/api/project/" + id,
          { 
          })
          .subscribe(
            data => {
              console.log("Delete Request is successful ", data);
              //Reload data 
              this.ngOnInit();
    
              if (data){
                this.error = "Project Deleted Sucessfully!";
              }else{
                this.error = "Please delete task and then Project";
              }
             
              this.isEdit = false;
              this.ScrollTop();
              
            },
            error => {
              console.log("Error", error);
              this.error = "Error in delete";
              this.ScrollTop();
            }
    
          );

  }

  AddProject() {
    // Web API Call  
 

    if (this.setDate == "false") {
      this.start_Date = "";
      this.end_Date = "";
    } 

    if (this.isEdit){

      console.log(this.id);

      //Get latest records from table:
      const params = new HttpParams().set('_page', "1").set('_limit', "1");
      
      this.httpClient.get<any[]>("http://localhost:54949/api/project/" + this.id,
      { params }).subscribe(
        data => {
          console.log("PUT Request is successful ", data);
          this.projectDetail = data;

          console.log(this.projectDetail);

          this.projectDetail.Project_Name = this.projectName;
          this.projectDetail.Start_Date = this.StringToDate(this.start_Date);
          this.projectDetail.End_Date = this.StringToDate(this.end_Date);
          this.projectDetail.Priority = this.priority;
          this.setRam(this.priority);
    
          console.log(this.projectDetail);
    
    
          this.httpClient.put("http://localhost:54949/api/project/" + this.projectDetail.Project_ID,
          {
            "Project_ID" : this.projectDetail.Project_ID,
            "Project_Name": this.projectDetail.Project_Name,
            "Priority": this.projectDetail.Priority,
            "Start_Date": this.projectDetail.Start_Date,
            "End_Date": this.projectDetail.End_Date
          })
          .subscribe(
            data => {
              console.log("POST Request is successful ", data);
              //Reload data 
              this.ngOnInit();
    
              this.error = "Project Updated Sucessfully!";
              this.isEdit = false;
              this.ScrollTop();
              
            },
            error => {
              console.log("Error", error);
              this.error = "Error in Adding Project";
              this.ScrollTop();
            }
    
          );

        }         
      ); 
 

    } else{

      console.log(this.projectName);
      this.httpClient.post("http://localhost:54949/api/project",
      {
        "Project_Name": this.projectName,
        "Priority": this.priority,
        "Start_Date": this.start_Date,
        "End_Date": this.end_Date,
        "Manager": this.manager
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          //Reload data 
          this.ngOnInit();

          this.error = "New Project Created Sucessfully!";
          this.ScrollTop();
          
        },
        error => {
          console.log("Error", error);
          this.error = "Error in Adding Project";
          this.ScrollTop();
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


  OpenPopup() {
    console.log("ffffff");
    //jQuery("#osx-modal-content").modal();
  }

  setRam(value){
    if (this.isEdit){
    this.selectedRam = this.priority;}
    else{
      this.selectedRam = value;
    }
    console.log(this.selectedRam);
  }
  LoadProjects() { 

    const params = new HttpParams().set('_page', "1").set('_limit', "1");

    this.httpClient.get<any[]>("http://localhost:54949/api/project",
      { params }).subscribe(
        data => {
          console.log("GET Request is successful ", data);
          this.projectList = data;
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

}
