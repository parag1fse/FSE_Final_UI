import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';


const routes: Routes = [
  {
    path: "user", component: UserComponent
  },
  {
    path: "task", component: TaskComponent
  },  
  {
    path: "task/:id", component: TaskComponent
  }, 
  {
    path: "project", component: ProjectComponent
  },
  {
    path: "viewtask", component: ViewtaskComponent
  },
  {
    path: "", redirectTo: "project", pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
