import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { SignInAuthDataModel } from './singIn-auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface LoginResponceData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered: string
}

interface SignUpResponceData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

@Injectable({
  providedIn: 'root'
})

export class AppSignInAuthService {

  authData = new BehaviorSubject<SignInAuthDataModel>(null)
  autoLogOutTimer: any = null

  constructor(private http: HttpClient, private router: Router) { }

  autoLogIn() {
    const userData: { eamil: string, id: string, _token: string, _tokenExp: Date } = JSON.parse(localStorage.getItem('user'))
    if (!userData) {
      return;
    }

    const loadAuthData = new SignInAuthDataModel(userData.eamil, userData.id, userData._token, userData._tokenExp)
    if (loadAuthData.token) {
      console.log('auto loged In')
      const expDate = new Date(loadAuthData.expTime).getTime() - new Date().getTime()
      this.autoLogOut(expDate)
      this.authData.next(loadAuthData)
    }
  }

  autoLogOut(logOutTimer) {
    console.log("auto logout in:", parseInt(String(logOutTimer / 1000 / 60 / 60)), "hr -", parseInt(String((logOutTimer / 1000 / 60) % 60)), "min")
    this.autoLogOutTimer = setTimeout(() => {
      this.signOut()
    }, logOutTimer)
  }

  login(user:{email:string,password:string}){
    return this.http
    .post<LoginResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.ApiKey,{ email : user.email, password : user.password , returnSecureToken: true })
    .pipe(tap(data => {
      this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn)
    }))
  }

  signUp(user:{email:string,password:string}){
    return this.http
    .post<SignUpResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.ApiKey, { email : user.email, password : user.password , returnSecureToken: true })
    .pipe( tap(data => {
      this.handleAuth(data.email, data.localId, data.idToken, +data.expiresIn)
    }))
  }

  private handleAuth(email: string, userId: string, token: string, expIn: number) {
    const expDate = new Date(new Date().getTime() + expIn * 1000)
    const authData = new SignInAuthDataModel(email, userId, token, expDate)
    this.autoLogOut(expIn * 1000)
    this.authData.next(authData)
    localStorage.setItem('user', JSON.stringify(authData))
  }

  signOut() {
    this.authData.next(null)
    this.router.navigate(['/auth'])
    //localStorage.removeItem('user')
    localStorage.clear()
    if (this.autoLogOutTimer) {
      clearTimeout(this.autoLogOutTimer)
    }
    this.autoLogOutTimer = null
  }
}
