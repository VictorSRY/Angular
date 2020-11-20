import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogService } from '../shared/log.service';
import { User } from '../shared/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsertableService{

    users:User[]=[]
    usersUpdate = new BehaviorSubject<User[]>(this.users)

    constructor(private http:HttpClient,private log:LogService){}

    public setUsers(){
        this.getDb().subscribe( users=>{this.users=users; this.sendUpadte()}, error=>{this.log.data('from: ut_Service-setUsers() \n error:',error)})
    }

    public addUser(user:User):Observable<any>{
        this.users.push(user)
        this.sendUpadte()
        return this.setDb().pipe( tap(data=>{this.log.data('from: ut_Service-addUsers() \n data:',data)}) )
    }

    public getUser(index:number): User {
        return this.users.slice()[index]
    }

    public updateUser(index:number,user:User):Observable<any>{
        this.users[index]=user
        this.sendUpadte()
        return this.setDb().pipe( tap(data=>{this.log.data('from: ut_Service-updateUsers() \n data:',data)}) )
    }

    public removeUser(index:number){
        this.users.splice(index,1)
        this.sendUpadte()
        this.setDb().subscribe( data=> this.log.data('from: ut_Service-removeUsers() \n data:',data) )
    }

    public sendUpadte(){
        this.usersUpdate.next(this.users.slice())
    }

    private getDb(){
        return this.http.get<User[]>('https://companionapp-project.firebaseio.com/user%20table.json').pipe(tap(data=>{this.log.data('from: ut_Service-getDb() \n data',data,'\n')}))
    }

    
    private setDb(){
        return this.http.put<User[]>('https://companionapp-project.firebaseio.com/user%20table.json',this.users)
    }
}