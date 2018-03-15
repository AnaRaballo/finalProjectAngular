import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";

import { AdoptionService } from "../../services/adoption.service";


@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {

  currentUser: string;
  adoptionsListError: string;
  adoptions: any;
  baseUrl = environment.apiBase;

  constructor(private myAuthService: AuthService, private myRouter: Router, private myAdoptionService: AdoptionService) { }

  ngOnInit() {
    this.getAdoption();
    this.myAuthService
      .checklogin()
    //If success, we are logged in.
      .then(resultFromApi => {
        this.currentUser = resultFromApi;
        console.log("user is: ", resultFromApi)
      })

   // Even if you don't do anything on error, catch to avoid a console error.
      .catch (err => {
        console.log(err);
        this.myRouter.navigate(["/adoption"]);
      })
  }

  getAdoption() {
    this.myAdoptionService.getAllAdoptions()
    .subscribe(allTheAdoptions => {
      console.log("allTheAdoptions: ", allTheAdoptions)
        this.adoptions = allTheAdoptions;
      },
      () => {
        this.adoptionsListError = "Sorry, no dogs listed.";
      }
    );
  } // close getAdoptions()

}
