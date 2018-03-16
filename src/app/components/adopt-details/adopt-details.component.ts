import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"

import { AdoptionService } from "../../services/adoption.service";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise"
import { Route } from '@angular/router/src/config';
// import { last } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-adopt-details',
  templateUrl: './adopt-details.component.html',
  styleUrls: ['./adopt-details.component.css']
})
export class AdoptDetailsComponent implements OnInit {
  dog = <any>{}

  baseUrl = environment.apiBase;
  public updateDog: Object = {}
  public dogDescription: String;
  
  saveError = "";

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

  // Getting one dog and it's details
  getDogDetails(id) {
    this.myAdoptionService.getId(id)
    .then( theDogDetails => {
        this.dog = theDogDetails;
        console.log("dog details: ", this.dog)
    })
  }

  doUpdate(id, formData){
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.dogDescription);

    this.dogDescription = formInfo.dogDescription.value;
    this.sendUpdatesToApi(id)
  }

  sendUpdatesToApi(id){
    this.updateDog = { dogDescription: this.dog.description };
    console.log( "updates: ", this.updateDog)
      this.myAdoptionService.updatedDog(id, this.updateDog)
      .toPromise()
      .then(() => {
        this.myRouter.navigate(['/adoption'])
      })
      .catch()
      } 

  deleteDog() {
    if(!confirm("Are you sure?")) {
      return;
    }
    this.myAdoptionService
    .deleteDog(this.dog._id)
    .then(() => {
      console.log("Success");
      this.myRouter.navigate(["/adoption"]);
    })
    .catch(err => {
      alert("Sorry! Something went wrong.");
      console.log("Dog Delete Error");
      console.log(err);
    });
  }
  }



