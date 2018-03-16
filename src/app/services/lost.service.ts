import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from "../../environments/environment";

@Injectable()
export class LostService {

  constructor( private myHttp: Http ) { }

  getAllLostDogs(){
    return this.myHttp.get(`${environment.apiBase}/api/lost`,
        { withCredentials: false })
        .map( res => res.json())
  }
  
  getLostDogId(id){
    return this.myHttp.get(`${environment.apiBase}/api/lost/${id}`,
        { withCredentials: false })
    .toPromise()
    .then( res => res.json() )
  }

  createNewLost(lostDogData){
    return this.myHttp
    .post(`${environment.apiBase}/api/lost`, lostDogData, 
        { withCredentials: true })
    .toPromise()
    .then( res => res.json())
  }

  updatedLostDog(id, updates){
    return this.myHttp.put(`${environment.apiBase}/api/lost/${id}`, updates, 
        { withCredentials: true })
    .map(res => res.json());
  }

  deleteLostDog(id) {
    return this.myHttp.delete(`${environment.apiBase}/api/lost/${id}`,
        { withCredentials: true })
    .toPromise()
  }
}
