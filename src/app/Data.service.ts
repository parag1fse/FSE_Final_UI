import { Injectable } from '@angular/core';
import { tabledata } from '../app/ServiceInterface';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class DataService {

  constructor(private _http: HttpClient) {

  }

  gettabledata(fromdate: string, todate: string, applicationname: string, errordescription: string) {
    return this._http.get<any[]>('http://10.189.100.162/ELAPI/Api/Values/GetErrorLog/' + fromdate + "/" + todate + "/" + applicationname + "/" + errordescription);
  }
}

