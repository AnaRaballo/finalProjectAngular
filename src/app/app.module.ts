import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

// Authentication
import { SignupComponent } from './components/signup/signup.component';

// Services
import { AuthService } from './services/auth.service';
import { AdoptionService } from './services/adoption.service'

// Routes
import { AppRoutingModule } from './app.routing';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { LoginComponent } from './components/login/login.component';
import { NewAdoptionComponent } from './components/new-adoption/new-adoption.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

// Image Config
import { FileUploadModule } from "ng2-file-upload";
import { AdoptDetailsComponent } from './components/adopt-details/adopt-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AdoptionComponent,
    LoginComponent,
    NewAdoptionComponent,
    NavBarComponent,
    AdoptDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [ AuthService, AdoptionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
