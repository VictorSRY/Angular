import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppSignInAuthService } from './app-sign-in-auth.service';

@Component({
  selector: 'app-app-sign-in',
  templateUrl: './app-sign-in.component.html',
  styleUrls: ['./app-sign-in.component.css']
})
export class AppSignInComponent implements OnInit {

  @ViewChild('loginForm') login:NgForm
  type = "student"
  
  constructor(private loginS:AppSignInAuthService) { }

  ngOnInit(): void {
  }

  logIn(){
    console.log(this.login.value.userid)
    this.loginS.login({email: this.login.value.userid, password: this.login.value.password}).subscribe
  }

  SignUp(){
    console.log("signUp")
    this.loginS.signUp({email: this.login.value.userid, password: this.login.value.password}).subscribe()
  }

}
