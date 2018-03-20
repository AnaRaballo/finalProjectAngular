import { Component, OnInit } from '@angular/core';

import { LostService } from "../../services/lost.service"
import { AuthService } from "../../services/auth.service"
import { Router } from "@angular/router"
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-new-lost',
  templateUrl: './new-lost.component.html',
  styleUrls: ['./new-lost.component.css']
})
export class NewLostComponent implements OnInit {
  newLostDog = {
    lostDogLocation:""
  }

  saveError: string;

  myUploader = new FileUploader({
    url: environment.apiBase + "/api/lost",
    itemAlias: "lostDogImage"
  });

  constructor(private myAuthService: AuthService, private myRouter: Router, private myLostService: LostService) { }

  ngOnInit() {
    this.myAuthService
    .checklogin()
  //If success, we are logged in.
    .then()

 // Even if you don't do anything on error, catch to avoid a console error.
    .catch (err => {
      console.log(err);
      this.myRouter.navigate(["/lost"]);
    });
  }

  // saveNewLostDog(){
  //   if (this.myUploader.getNotUploadedItems().length === 0) {
  //     this.saveLostDogNoImage();
  //   } else {
  //     this.saveLostDogWithImage();
  //   }
  // }

  // private saveLostDogNoImage(){
  //   this.myLostService.createNewLost(this.newLostDog)
  //     .then( res => {
  //       this.newLostDog = {
  //         lostDogLocation: ""
  //     }
  //     this.saveError = ""
  //   this.myRouter.navigate(['/lost']);
  //   })
  //   .catch( err => { this.saveError = "Something went wrong when saving"})
  // }

  private saveNewLostDog(){
    this.myUploader.onBuildItemForm = (item, form) => {
      form.append('lostDogLocation', this.newLostDog.lostDogLocation);
    }
    this.myUploader.onSuccessItem = (item, response) =>{
      console.log("========", this.newLostDog)
      this.newLostDog = {
        lostDogLocation: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/lost"]);
        location.reload();
    }
    this.myUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving dog with image went bad. Sorry!";
    }
    this.myUploader.uploadAll();
  }
  

}
