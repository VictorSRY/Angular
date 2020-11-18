import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthDataModel } from 'src/app/shared/authData.model';
import { LogService } from 'src/app/shared/log.service';
import { environment } from 'src/environments/environment';

export interface LogInResponceData {
    token: string
    email: string
    refreshToken: string
    expiresIn: string
    userId: string
    registered: string
}

interface SignUpResponceData {
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
    userAuth = new BehaviorSubject<AuthDataModel>(null)
    constructor(private http:HttpClient,private log:LogService) { }
    
    public login(user){
        return this.http.post<LogInResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.apiKey,user).pipe( tap(data=>{ this.log.data('from: authService-login()  \n log in data :',data,'\n'); this.handleResponseData(data.email,data.userId,data.token,+data.expiresIn) }))
    }

    public AutoLogIn(){

    }

    private handleResponseData( email:string, userId:string, token:string, tokenExpIn:number){
        const expTime = new Date().getTime() + tokenExpIn
        const authData = new AuthDataModel(email,userId,token,new Date(expTime))
        this.userAuth.next(authData)
        localStorage.setItem('userAuthData',JSON.stringify(authData))
    }
}