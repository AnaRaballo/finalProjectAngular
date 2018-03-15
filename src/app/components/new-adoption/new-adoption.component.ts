import { Component, OnInit } from '@angular/core';

import { AdoptionService } from "../../services/adoption.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router"
import { FileUploader} from "ng2-file-upload";
import { environment } from "../../../environments/environment";



@Component({
  selector: 'app-new-adoption',
  templateUrl: './new-adoption.component.html',
  styleUrls: ['./new-adoption.component.css']
})
export class NewAdoptionComponent implements OnInit {
  newDog = {
    dogDescription:""
  }

  saveError: string;

  myUploader = new FileUploader({
    url: environment.apiBase + "/api/adoption",
    itemAlias: "dogImage"
  });

  constructor(private myAuthService: AuthService, private myRouter: Router, private myAdoptionService: AdoptionService) { }

  ngOnInit() {
    this.myAuthService
    .checklogin()
  //If success, we are logged in.
    .then()

 // Even if you don't do anything on error, catch to avoid a console error.
    .catch (err => {
      console.log(err);
      this.myRouter.navigate(["/adoption"]);
    });
  }

  saveNewDog(){
    if (this.myUploader.getNotUploadedItems().length === 0) {
      this.saveDogNoImage();
    } else {
      this.saveDogWithImage();
    }
  }

  private saveDogNoImage(){
    this.myAdoptionService.createNewAdoption(this.newDog)
      .then( res => {
        this.newDog = {
          dogDescription: ""
      }
      this.saveError = ""
    this.myRouter.navigate(['/adoption']);
    })
    .catch( err => { this.saveError = "Something went wrong when saving"})
  }

  private saveDogWithImage(){
    this.myUploader.onBuildItemForm = (item, form) => {
      form.append('dogDescription', this.newDog.dogDescription);
    }
    this.myUploader.onSuccessItem = (item, response) =>{
      this.newDog = {
        dogDescription: ""
        };
        this.saveError = ""
        this.myRouter.navigate(["/adoption"]);
    }
    this.myUploader.onErrorItem = (item, response) => {
      this.saveError = "Saving dog with image went bad. Sorry!";
    }
    this.myUploader.uploadAll();
  }
}
