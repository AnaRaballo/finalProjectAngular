import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"

import { AdoptionService } from "../../services/adoption.service";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise"
import { Route } from '@angular/router/src/config';

// import { FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-adopt-details',
  templateUrl: './adopt-details.component.html',
  styleUrls: ['./adopt-details.component.css']
})
export class AdoptDetailsComponent implements OnInit {
  dog = Object;

  public updatedDog: Object = {}
  public dogDescription: String;

  saveError = "";

  baseUrl = environment.apiBase;

  constructor(
    private myAdoptionService: AdoptionService,
    private myAuthService: AuthService,
    private myRoute: ActivatedRoute,
    private myRouter: Router
  ) { }

  ngOnInit() {
    this.myRoute.params.subscribe(params => {
      this.getDogDetails(params["id"]);
    });
    this.myAuthService
    .checklogin()
  //If success, we are logged in.
    .then()

 // Even if you don't do anything on error, catch to avoid a console error.
    .catch (err => {
      console.log(err);
      this.myRouter.navigate(["/adoptions/id"]);
    });

  }

  getDogDetails(id) {
    this.myAdoptionService.getId(id)
    .then( res => {
        this.dog = res;
        console.log("dog details: ", this.dog)
    })
    .catch()
  }

}
