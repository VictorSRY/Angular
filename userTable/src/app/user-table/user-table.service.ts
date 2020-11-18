import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
    providedIn: 'root'
})
export class UsertableService{
    users:User[]=[]
    userUpdate = new BehaviorSubject<User[]>(this.users)

    public addUser(index:number,user:User){

    }
}