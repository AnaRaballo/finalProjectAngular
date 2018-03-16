import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";


@Injectable()
export class AdoptionService {

  constructor( private myHttp: Http ) { }

  getAllAdoptions(){
    return this.myHttp.get(`${environment.apiBase}/api/adoption`,
        { withCredentials: false })
        .map( res => res.json())
  }
  
  getId(id){
    return this.myHttp.get(`${environment.apiBase}/api/adoption/${id}`,
        { withCredentials: false })
    .toPromise()
    .then( res => res.json() )
  }

  createNewAdoption(dogData){
    return this.myHttp
    .post(`${environment.apiBase}/api/adoption`, dogData, 
        { withCredentials: true })
    .toPromise()
    .then( res => res.json())
  }

  updatedDog(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/adoption/${id}`, updates, 
        { withCredentials: true })
    .map(res => res.json());
  }

  deleteDog(id) {
    return this.myHttp.delete(`${environment.apiBase}/api/adoption/${id}`,
        { withCredentials: true })
    .toPromise()
  }
}
