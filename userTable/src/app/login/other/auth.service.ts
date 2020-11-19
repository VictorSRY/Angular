import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthDataModel } from 'src/app/shared/authData.model';
import { LogService } from 'src/app/shared/log.service';
import { environment } from 'src/environments/environment';

interface LogInResponceData {
    token: string
    email: string
    refreshToken: string
    expiresIn: string
    userId: string
    registered: string
}

interface RegisterResponceData {
    token: string
    email: string
    refreshToken: string
    expiresIn: string
    userId: string
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public userAuth = new BehaviorSubject<AuthDataModel>(null)
    private autoLogOutTimer: any = null

    constructor(private http: HttpClient, private log: LogService, private router: Router) { }

    public register(user: { email: string, password: String, returnSecureToken: boolean }): Observable<any> {
        return this.http.post<RegisterResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + /* firebase ApiKey */ environment.apiKey, /* data */ user).pipe(tap(data => { this.log.data('from: authService-register()  \n Register data :', data, '\n'); this.handleResponseData(data.email, data.userId, data.token, +data.expiresIn) }))
    }

    public login(user: { email: string, password: String, returnSecureToken: boolean }): Observable<any> {
        return this.http.post<LogInResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + /* firebase ApiKey */ environment.apiKey, /* data */ user).pipe(tap(data => { this.log.data('from: authService-login()  \n log in data :', data, '\n'); this.handleResponseData(data.email, data.userId, data.token, +data.expiresIn) }))
    }

    public logOut(): void {
        this.log.data('from: authService-logOut()  \n Message:logging out User \n')
        this.userAuth.next(null)
        this.router.navigate(['/login'])
        localStorage.removeItem('userAuthData')
        //localStorage.clear()
        if (this.autoLogOutTimer) {
            clearTimeout(this.autoLogOutTimer)
        }
        this.autoLogOutTimer = name
    }

    public autoLogIn(): void {
        this.log.data('from: authService-autoLogin()  \n Message: trying Auto-login \n')
        const authData: AuthDataModel = JSON.parse(localStorage.getItem('userAuthData'))
        if (!authData) return
        const expTime: number = new Date(authData.tokenExp).getTime() - new Date().getTime()
        this.autoLogOut(expTime)
        this.userAuth.next(authData)
    }

    private autoLogOut(timeout: number): void {
        this.log.data('from: authService-autoLogOut()  \n Message:starting auto logout User \n')
        this.autoLogOutTimer = setTimeout(() => {
            this.logOut()
        }, timeout);
    }

    private handleResponseData(email: string, userId: string, token: string, tokenExpIn: number): void {
        const expTime = new Date().getTime() + tokenExpIn
        const authData = new AuthDataModel(email, userId, token, new Date(expTime))
        this.userAuth.next(authData)
        localStorage.setItem('userAuthData', JSON.stringify(authData))
    }

}