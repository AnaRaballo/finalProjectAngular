import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { NewAdoptionComponent } from './components/new-adoption/new-adoption.component';
import { AdoptDetailsComponent } from './components/adopt-details/adopt-details.component';


const routes: Routes = [
    { 
    path: 'signup', 
    component: SignupComponent 
},
{ 
    path: 'login', 
    component: LoginComponent 
},
{ 
    path: 'adoption', 
    component: AdoptionComponent 
},
{ 
    path: 'add-adoption', 
    component: NewAdoptionComponent 
},
{ 
    path: 'adoptions/:id', 
    component: AdoptDetailsComponent 
}
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}