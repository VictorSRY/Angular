import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/other/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  public logout():void{
    this.auth.logOut()
    this.router.navigate(['login'])
  }
  ngOnInit(): void {
  }

}
