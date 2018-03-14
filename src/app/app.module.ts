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

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AdoptionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ AuthService, AdoptionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
