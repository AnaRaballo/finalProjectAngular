import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  logoutError: string; 
  currentUser: any;
  isLoggedIn: boolean = false;

  constructor(private myAuthService: AuthService, private myRouter: Router){ }
    
  ngOnInit() { 
    this.myAuthService.checklogin()
      .then(userFromDb => {
        this.currentUser = userFromDb;
        this.isLoggedIn = true;
        console.log("user from db is: ", this.currentUser)
      })
      .catch(err=>{
        console.log("Error in check login on navbar.")
      })

  }
  
  logMeOut() {
      this.myAuthService
        .logout()
        .then(() => {
          this.myRouter.navigate(["/"]);
          location.reload();
        })
        .catch(() => {
          this.logoutError = "Log out went bad.";
        });
    } // close logMeOutPls()
}
