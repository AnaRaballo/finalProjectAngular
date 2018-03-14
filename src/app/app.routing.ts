import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdoptionComponent } from './components/adoption/adoption.component';


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
}
];

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}