import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { environment } from "../../../environments/environment";

import { LostService } from "../../services/lost.service";


@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent implements OnInit {
  //Google Maps
  lat: number = 51.678418;
  lng: number = 7.809007;

  //Crud
  currentUser: string;
  lostListError: string;
  lost: any;
  baseUrl = environment.apiBase;

  constructor(private myAuthService: AuthService, private myRouter: Router, private myLostService: LostService) { }

  ngOnInit() {
    this.getLostDogs();
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
        this.myRouter.navigate(["/lost"]);
      })
  }

  getLostDogs() {
    this.myLostService.getAllLostDogs()
    .subscribe(allTheLostDogs => {
      console.log("allTheLostDogs: ", allTheLostDogs)
        this.lost = allTheLostDogs;
      },
      () => {
        this.lostListError = "Sorry, no lost dogs listed.";
      }
    );
  } // close getLostDogs()

}
