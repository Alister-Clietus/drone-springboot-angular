import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { ShowPersonComponent } from './show-person/show-person.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = 
[
  {
    path:"welcome",component:LandingComponent
  },
  {
    path:"",component:LandingpageComponent
  },
  {
    path:"landing",component:LandingpageComponent
  },
  {
    path:"add",component:AddProfileComponent
  },
  {
    path:"show",component:ShowProfileComponent
  },
  {
    path:"person/:selectedUserName",component:ShowPersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
