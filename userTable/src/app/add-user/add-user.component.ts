import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private tableS: UsertableService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const index = this.route.queryParams['userIndex']
    if (index) {
      this.index = index
    }
    if (index !== -1) {
      this.tableS.getUser(index)
    }
  }

  public add(form: NgForm): void {
    if (!form.valid) return
    this.tableS.addUser(this.formData)
  }
  
}
