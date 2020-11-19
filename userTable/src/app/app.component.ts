import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/other/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'userTable';

  constructor(private auth:AuthService){}
  
  ngOnInit():void{
    this.auth.autoLogIn()
  }
}
