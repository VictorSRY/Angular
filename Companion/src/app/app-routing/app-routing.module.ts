import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSignInComponent } from '../app-sign-in/app-sign-in.component';
import { HomeComponent } from '../home/home.component';

@NgModule({
  imports:[
      RouterModule.forRoot([
        {path:"home",redirectTo:":userId"},
        {path:'login',component:AppSignInComponent},
        {path:':userId',component:HomeComponent},
        {path:"",redirectTo:'login',pathMatch:"full"},
    ])
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
