import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router"

import { AdoptionService } from "../../services/adoption.service";
import { AuthService } from "../../services/auth.service";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../environments/environment";

import "rxjs/add/operator/toPromise"
import { Route } from '@angular/router/src/config';


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
  currentUser= <any>{}
  saveError = "";

  myUploader = new FileUploader({
    url: environment.apiBase + "/api/adoption",
    itemAlias: "dogImage"
  });

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
    .then( res => {
      this.currentUser = res;
      console.log("current user is: ", this.currentUser._id)
    })

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
        console.log("dog details: ", this.dog.image)
    })
  }

  doUpdate(id, formData){
    const formInfo = formData.form.controls;
    console.log("=============== formData: ", formInfo.dogDescription);

    this.dogDescription = formInfo.dogDescription.value;
    this.sendUpdatesToApi(id)

    if (this.myUploader.getNotUploadedItems(). length === 0){
      this.updateDogNoImage(id);
    } else {
      this.updateDogImage(id);
    }
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
  
  private updateDogNoImage(id){
    console.log("update dog is: ", this.updateDog)
    this.myAdoptionService.updatedDog(id, this.updateDog)
    .toPromise()
    .then (res => {
      this.updateDog = {
        dogDescription: ""
      }
      this.saveError = ""
      this.myRouter.navigate([`/adoption/${id}`]);
      // location.reload();
    })
    .catch( err => { this.saveError = "Something went wrong when saving"})
  }
  
  private updateDogImage(id){
    this.myUploader.onBuildItemForm = (item, form) => {
      form.append('dogDescription', this.updateDog[0].dogDescription);
    }
    this.myUploader.onSuccessItem = (item, response) =>{
      this.updateDog = {
        dogDescription: ""
        };
        this.saveError = ""
        this.myRouter.navigate([`/adoption/${id}`]);
        // location.reload();
    }
    this.myUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving dog with image went bad. Sorry!";
    }
    this.myUploader.uploadAll();
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



