import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  employee_ID: string;
  First_Name: string;
  Last_Name: string; 
  error: string;
  isEdit: any;
  User_Id: string;
  btnText: string;
     
  userList: any[];

  constructor(private httpClient: HttpClient) { }
  objObservable: Observable<any>; 

  ngOnInit() {    
    this.LoadUser();

    this.employee_ID = "";
    this.First_Name = "";
    this.Last_Name= ""; 
    this.User_Id= ""; 
    this.btnText = "Add";
    this.isEdit = false;
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


  UpdateUser(obj: any) { 

    console.log("update user" + obj);  

    this.ScrollTop();

    this.User_Id = obj.User_ID;
    this.First_Name = obj.First_Name;
    this.Last_Name = obj.Last_Name;
    this.employee_ID = obj.Employee_ID

    this.btnText = "Update";
    this.isEdit = "true";

  }

  DeleteUser(id: string) {
     console.log("Delete User" + id);

        this.httpClient.delete("http://localhost:54949/api/users/" + id,
          { 
          })
          .subscribe(
            data => {
              console.log("Delete Request is successful ", data);
              //Reload data 
              this.ngOnInit();
    
              if (data){
                this.error = "User Deleted Sucessfully!";
              }else{
                this.error = "Please delete task and then User";
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

  AddUser(){

    console.log("User details");
    console.log(this.First_Name);
    console.log(this.Last_Name);
    console.log(this.employee_ID); 


    if (this.isEdit){
      this.httpClient.put("http://localhost:54949/api/users/" + this.User_Id,
      {
        "First_Name": this.First_Name,
        "Last_Name": this.Last_Name,
        "Employee_ID": this.employee_ID,
        "User_ID": this.User_Id
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          //Reload data 
          this.ngOnInit();

          this.error = "User Updated Sucessfully!";
          this.isEdit = false;
          this.ScrollTop();

        },
        error => {
          console.log("Error", error);
          this.error = "Error in Updating User";
        }

      ); 
      

    }else{
      this.httpClient.post("http://localhost:54949/api/users",
      {
        "First_Name": this.First_Name,
        "Last_Name": this.Last_Name,
        "Employee_ID": this.employee_ID
      })
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          //Reload data 
          this.ngOnInit();

          this.error = "User Added Sucessfully!";
        },
        error => {
          console.log("Error", error);
          this.error = "Error in Adding User";
        }
  
      ); 

    }
    
     
  }


  LoadUser() { 
     const params = new HttpParams().set('_page', "1").set('_limit', "1");
     this.httpClient.get<any[]>("http://localhost:54949/api/users",
       { params }).subscribe(
         data => {            
           this.userList = data;
           console.log(this.userList);
         }         
       ); 
  } 


}
