import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DataService} from './data.service';

import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SortPipe } from './soryBy.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    ProjectComponent,
    UserComponent,
    ViewtaskComponent ,
    AppComponent,
    SortPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule ,
    AutocompleteLibModule 
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
