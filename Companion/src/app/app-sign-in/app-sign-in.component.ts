import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSignInAuthService } from './app-sign-in-auth.service';
import { SignInAuthDataModel } from './singIn-auth-data.model';

@Component({
  selector: 'app-app-sign-in',
  templateUrl: './app-sign-in.component.html',
  styleUrls: ['./app-sign-in.component.css']
})
export class AppSignInComponent implements OnInit {

  @ViewChild('loginForm') login:NgForm
  type = "student"
  authData:SignInAuthDataModel
  constructor(private loginS:AppSignInAuthService, private router:Router) { }

  ngOnInit(): void {
    this.loginS.authData.subscribe( data =>{
      this.authData = data
    }) 
  }

  logIn(){
    console.log(this.login.value.userid)
    this.loginS.login({email: this.login.value.userid, password: this.login.value.password}).subscribe( data => {
      console.log(this.router.url)
      this.router.navigate([this.authData.userId])
      console.log(this.router.navigate([this.authData.userId]))
    })
  }

  SignUp(){
    console.log("signUp")
    this.loginS.signUp({email: this.login.value.userid, password: this.login.value.password}).subscribe()
  }

}
