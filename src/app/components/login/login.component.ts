import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // isLoggedOut: boolean = false;

  constructor(private myAuthService: AuthService, private myRouter: Router) { }

  loginErrorMessage: string;

  loginInfo = {
    username: "",
    password: ""
  };

  ngOnInit() {
    this.myAuthService
      .checklogin()
      // If success, we are logged in.
      .then(resultFromApi => {
        this.myRouter.navigate(["/adoption"]);
      })

      // Even if you don't do anything on error, catch to avoid a console error.
      .catch(err => {
        console.log(err);
      });
}

  doLogin() {
    this.myAuthService
    .login(this.loginInfo)
    .then(resultFromApi => {
      //clear form
      this.loginInfo = { username: "", password: ""};

      //clear error message
      this.loginErrorMessage = "";

      //redirect to /adoption
      this.myRouter.navigate(["/adoption"]);
    })
    .catch(err => {
      const parsedError = err.json();
      this.loginErrorMessage = parsedError.message + "🤕";
    });
  } //close doLogin()

}
