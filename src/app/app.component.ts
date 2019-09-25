import { DataService } from '../app/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 

export class AppComponent {
  title = 'taskmanager';
 
  activeViewTask : string;
  activeTask : string;
  activeProject : string;
  activeUser : string;

  ngOnInit() {    
    this.activeViewTask  = "button";
    this.activeTask  = "button";
    this.activeProject  = "button primary";
    this.activeUser =  "button";
  }

  
  changeMenu(tab: string){
    this.activeViewTask  = "button";
    this.activeTask  = "button";
    this.activeProject  = "button";
    this.activeUser =  "button";

     if (tab == "1"){
      this.activeProject  = "button primary";

     }else if (tab == "2"){
      this.activeTask  = "button primary";

     }if (tab == "3"){
      this.activeUser  = "button primary";

     }if (tab == "4"){
      this.activeViewTask  = "button primary";
     }

  }

  constructor(private data: DataService) { }
 
}
