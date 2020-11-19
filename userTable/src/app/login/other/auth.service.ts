import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthDataModel } from 'src/app/shared/authData.model';
import { LogService } from 'src/app/shared/log.service';
import { environment } from 'src/environments/environment';

interface LogInResponceData {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
    registered: string
}

interface RegisterResponceData {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public userAuth = new BehaviorSubject<AuthDataModel>(null)
    private autoLogOutTimer: any = null

    constructor(private http: HttpClient, private log: LogService, private router: Router) { }

    public register(user: { email: string, password: String, returnSecureToken: boolean }): Observable<any> {
        return this.http.post<RegisterResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + /* firebase ApiKey */ environment.apiKey, /* data */ user).pipe(tap(data => { this.log.data('from: authService-register()  \n Register data :', data, '\n'); this.handleResponseData(data.email, data.localId, data.idToken, +data.expiresIn) }))
    }

    public login(user: { email: string, password: String, returnSecureToken: boolean }): Observable<any> {
        return this.http.post<LogInResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + /* firebase ApiKey */ environment.apiKey, /* data */ user).pipe(tap(data => { this.log.data('from: authService-login()  \n log in data :', data, '\n'); this.handleResponseData(data.email, data.localId, data.idToken, +data.expiresIn) }))
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

        const loadAuthData: { email: string, userId: string, _token: string, _tokenExp: Date } = JSON.parse(localStorage.getItem('userAuthData'))
        this.log.data('auto login data forund:', !loadAuthData, ' data:', loadAuthData)
        if (!loadAuthData) return
        const authData = new AuthDataModel(loadAuthData.email, loadAuthData.userId, loadAuthData._token, loadAuthData._tokenExp)
        if (authData.token) {
            const expTime: number = new Date(authData.tokenExp).getTime() - new Date().getTime()
            this.autoLogOut(expTime)
            this.userAuth.next(authData)
        }
    }

    private autoLogOut(timeout: number): void {
        this.log.data('from: authService-autoLogOut()  \n Message:starting auto logout check \n')
        this.autoLogOutTimer = setTimeout(() => {
            this.logOut()
        }, timeout);
    }

    private handleResponseData(email: string, userId: string, token: string, tokenExpIn: number): void {
        const expTime = new Date(new Date().getTime() + tokenExpIn * 1000)
        const authData = new AuthDataModel(email, userId, token, expTime)
        this.userAuth.next(authData)
        localStorage.setItem('userAuthData', JSON.stringify(authData))
    }

}