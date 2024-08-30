import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  constructor(private _HttpClient:HttpClient ) { }
  baseurl:string="http://localhost:8090"

  resutl:any;

  callidapi(id:string):Observable<any>
  {
     return this._HttpClient.get(`http://localhost:8090/acceptance-status/${id}`,{ responseType: 'text' })
  }

}
