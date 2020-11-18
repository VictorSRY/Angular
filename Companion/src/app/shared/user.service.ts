import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppSignInAuthService } from '../app-sign-in/app-sign-in-auth.service';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user:User

  constructor(private http:HttpClient,private auth:AppSignInAuthService) { }

  initializeUser(){
    this.auth.authData.pipe( take(1) ).subscribe( data =>{
      console.log(this.http.get(environment.dbLink+'user/'+data.userId).subscribe())
    })
    
  }

  get userData(){
    return this.user
  }

}
