import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

// Authentication
import { SignupComponent } from './components/signup/signup.component';

// Services
import { AuthService } from './services/auth.service';
import { AdoptionService } from './services/adoption.service'
import { LostService } from './services/lost.service'

// Routes
import { AppRoutingModule } from './app.routing';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { LoginComponent } from './components/login/login.component';
import { NewAdoptionComponent } from './components/new-adoption/new-adoption.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewLostComponent } from './components/new-lost/new-lost.component';

// Image Config
import { FileUploadModule } from "ng2-file-upload";
import { AdoptDetailsComponent } from './components/adopt-details/adopt-details.component';
import { LostComponent } from './components/lost/lost.component';

// Google Maps API Config
import { AgmCoreModule } from '@agm/core';
import { LostDetailsComponent } from './components/lost-details/lost-details.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AdoptionComponent,
    LoginComponent,
    NewAdoptionComponent,
    NavBarComponent,
    AdoptDetailsComponent,
    LostComponent,
    NewLostComponent,
    LostDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDg8RJxITThryFICnALvvijIyvMl8TYgjg'
    })
  ],
  providers: [ AuthService, AdoptionService, LostService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
