import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UsertableService } from '../user-table/user-table.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formData: User = new User('', '', '')
  @Input() index: number = -1
  public edit:boolean = false

  constructor(private tableS: UsertableService, private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    const index = this.route.snapshot.params['userIndex']
    if (index) {
      this.index = index
      this.edit = true
    }
    console.log('index:',this.index)
    if (this.edit) {
      this.formData = this.tableS.getUser(index)
    }
  }

  public add(form: NgForm): void {
    if (!form.valid) return
    if (this.edit) this.tableS.updateUser(this.index,this.formData).subscribe(()=>{ this.back() });
    else this.tableS.addUser(this.formData).subscribe(()=>{ this.back() })
  }

  public back(){
    if(this.edit) this.router.navigate(['../../'],{relativeTo:this.route});
    else this.router.navigate(['../'],{relativeTo:this.route})
  }
  
}
