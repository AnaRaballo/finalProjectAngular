import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { NewAdoptionComponent } from './components/new-adoption/new-adoption.component';
import { AdoptDetailsComponent } from './components/adopt-details/adopt-details.component';
import { LostComponent } from './components/lost/lost.component';
import { NewLostComponent } from './components/new-lost/new-lost.component';
import { LostDetailsComponent } from './components/lost-details/lost-details.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
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
    },
    {
        path: 'lost',
        component: LostComponent
    },
    {
        path: 'add-lost',
        component: NewLostComponent
    },
    {
        path: 'lost/:id',
        component: LostDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }