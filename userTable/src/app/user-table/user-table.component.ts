import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';
import { UsertableService } from './user-table.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {

  users:User[]=[]
  userSub:Subscription

  constructor(private tableS:UsertableService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.tableS.setUsers()
    this.userSub=this.tableS.usersUpdate.subscribe(users=>this.users=users)
  }

  public remove(index:number):void{
    this.tableS.removeUser(index)
  }

  public edit(index:number):void{
    this.router.navigate(['./',index],{relativeTo:this.route})
  }
  ngOnDestroy(){
    this.userSub.unsubscribe()
  }

}
