import { Component } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string | null = null;

  roles: { label: string; value: string }[] = [
    { label: 'Instructor', value: 'instructor' },
    { label: 'Estudiante', value: 'student' },
  ];

  constructor(private usersService: UsersService, private router: Router) {}

  async createUser() {
    if (!this.username || !this.email || !this.role) {
      this.errorMessage = 'Por favor complete todos los campos.';
      return;
    }

    const { error } = await this.usersService.createUser(
      this.username,
      this.email,
      this.role
    );
    if (error && (error as { message: string }).message) {
      this.errorMessage = (error as { message: string }).message;
      console.error('Error creando usuario:', error);
    } else {
      this.router.navigate(['/user/list']);
    }
  }
}
