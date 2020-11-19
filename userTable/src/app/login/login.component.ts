import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from '../shared/log.service';
import { AuthService } from './other/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logIn:FormGroup

  constructor(private auth:AuthService,private log:LogService,private router:Router) { }

  ngOnInit(): void {
    this.logIn=new FormGroup({
      'userId': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required)
    })
  }

  public logInRegister(){
    const user = this.logIn.value
    this.log.data('userID:',user.userId,'\npassword:',user.password)
    this.auth.login({email:user.userId,password:user.password,returnSecureToken:true}).subscribe(data=>{this.log.data('from: LoginComponent-logInRegister() \n data:',data,'\n');
    this.router.navigate(['home'])},error=>{const errorM:string=error.error.error.message; this.log.data('from: LoginComponent-logInRegister() \n error:',errorM);alert(errorM)})
  }
  
  public submit(){
    
    //
  }
}
