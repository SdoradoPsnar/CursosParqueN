import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.services';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  userList: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    const result = await this.usersService.userList();
    this.userList = result.users;
    console.log(this.userList);
  }

  async deleteUser(id: number) {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmed) {
      const { error } = await this.usersService.userDelete(id);
      if (!error) {
        this.userList = this.userList.filter((user: any) => user.id !== id);
      } else {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  }
}
