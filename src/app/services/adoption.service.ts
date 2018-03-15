import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/map';


@Injectable()
export class AdoptionService {

  constructor( private myHttp: Http ) { }

  getAllAdoptions(){
    return this.myHttp.get(`${environment.apiBase}/api/adoption`,
  {withCredentials: false})
  .map( res => res.json())
  }
}
