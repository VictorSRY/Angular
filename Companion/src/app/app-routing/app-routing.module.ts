import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSignInComponent } from '../app-sign-in/app-sign-in.component';

const appRoute:Routes=[
  {path:'',component:AppSignInComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoute)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
