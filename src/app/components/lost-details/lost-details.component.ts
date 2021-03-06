import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"

import { LostService } from "../../services/lost.service";
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";

import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise"
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-lost-details',
  templateUrl: './lost-details.component.html',
  styleUrls: ['./lost-details.component.css']
})
export class LostDetailsComponent implements OnInit {
  lostDog = <any>{}

  baseUrl = environment.apiBase;
  public updateLostDog: Object = {}
  public dogLocation: String;
  currentUser= <any>{}
  saveError = "";

  myUploader = new FileUploader({
    url: environment.apiBase + "/api/lost",
    itemAlias: "lostDogImage"
  });

  constructor(
    private myLostService: LostService,
    private myAuthService: AuthService,
    private myRoute: ActivatedRoute,
    private myRouter: Router
  ) { }

  ngOnInit() {
    this.myRoute.params.subscribe(params => {
      this.getLostDogDetails(params["id"]);
    });
    this.myAuthService
    .checklogin()
    //If success, we are logged in.
    .then( res =>{
      this.currentUser = res;
      console.log("current user is: ", this.currentUser)

    })

    // Even if you don't do anything on error, catch to avoid a console error.
    .catch (err => {
      console.log(err);
      this.myRouter.navigate(["/lost/id"]);
    });
  }

  // Getting one dog and it's details
  getLostDogDetails(id) {
    this.myLostService.getLostDogId(id)
    .then( theLostDogDetails => {
        this.lostDog = theLostDogDetails;
        console.log("dog: ", this.lostDog)
    })
  }

  doLostDogUpdate(id, formData){
    const formInfo = formData.form.controls;
    console.log("=============== formData: " , formInfo.dogLocation);

    this.dogLocation = formInfo.dogLocation.value;
    this.sendUpdatesToApi(id)

    // if (this.myUploader.getNotUploadedItems(). length === 0){
    //   this.updateLostDogNoImage(id);
    // } else {
    //   this.updateLostDogImage(id);
    // }
  }

  sendUpdatesToApi(id){
    this.updateLostDog = { dogLocation: this.lostDog.location };
    console.log( "updates: ", this.updateLostDog)
    this.myLostService.updatedLostDog(id, this.updateLostDog)
    .toPromise()
    .then(() => {
      this.myRouter.navigate(['/lost'])
    })
    .catch()
  }

  // private updateLostDogNoImage(id){
  //   console.log("update dog is: ", this.updateLostDog)
  //   this.myLostService.updatedLostDog(id, this.updateLostDog)
  //   .toPromise()
  //   .then (res => {
  //     this.updateLostDog = {
  //       dogDescription: ""
  //     }
  //     this.saveError = ""
  //     this.myRouter.navigate([`/lost/${id}`]);
  //     // location.reload();
  //   })
  //   .catch( err => { this.saveError = "Something went wrong when saving"})
  // }
  
  // private updateLostDogImage(id){
  //   this.myUploader.onBuildItemForm = (item, form) => {
  //     form.append('dogDescription', this.updateLostDog[0].dogDescription);
  //   }
  //   this.myUploader.onSuccessItem = (item, response) =>{
  //     this.updateLostDog = {
  //       dogDescription: ""
  //       };
  //       this.saveError = ""
  //       this.myRouter.navigate([`/lost/${id}`]);
  //       // location.reload();
  //   }
  //   this.myUploader.onErrorItem = (item, response) => {
  //     this.saveError = "Saving dog with image went bad. Sorry!";
  //   }
  //   this.myUploader.uploadAll();
  // }

  deleteLostDog() {
    if(!confirm("Are you sure?")) {
      return;
    }
    this.myLostService
    .deleteLostDog(this.lostDog._id)
    .then(() => {
      console.log("Success");
      this.myRouter.navigate(["/lost"]);
    })
    .catch( err => {
      alert("Sorry! Something went wrong.");
      console.log("Lost Dog Delete Error");
      console.log(err);
    });
  }
}
