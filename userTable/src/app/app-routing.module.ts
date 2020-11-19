import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GurdService } from './shared/gurd.service';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  {path:'',canActivate:[GurdService],children:[
    {path:'home',component:HomeComponent,children:[
      {path:'',component:UserTableComponent,pathMatch:'full'},
      {path:'add',component:AddUserComponent},
      {path:':userIndex',children:[
        {path:'',redirectTo:'edit',pathMatch:'full'},
        {path:'edit',component:AddUserComponent}
      ]},
    ]}
  ]},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
