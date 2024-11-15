import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.services';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent {
  userList: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    const result = await this.usersService.userList();
    this.userList = result.users;
    // console.log(this.userList);
  }

  async deleteUser(userId: string) {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este usuario?'
    );
    if (confirmed) {
      const { error } = await this.usersService.userDelete(userId);
      if (!error) {
        this.userList = this.userList.filter((user: any) => user.id !== userId);
      } else {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  }

  editUser(userId: string) {
    this.router.navigate(['/user/edit', userId]);
  }
}
