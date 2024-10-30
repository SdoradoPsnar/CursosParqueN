import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.services';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
  userList: any;
  constructor(private usersService: UsersService) {

  }

  ngOnInit(): void {
    const usersServiceList=this.usersService.userList().then((m)=>{
      this.userList=m.users;
      console.log(this.userList)
    })
  }

}
