import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users.services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userId!: string;
  username: string = '';
  email: string = '';
  role: string = '';
  errorMessage: string | null = null;

  roles = [
    { label: 'Instructor', value: 'instructor' },
    { label: 'Estudiante', value: 'student' },
  ];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    console.log('EditUserComponent inicializado');
    this.userId = this.route.snapshot.params['id'];
    console.log('userId capturado:', this.userId);

    if (this.userId) {
      const { user, error } = await this.usersService.getUserById(this.userId);
      if (error) {
        this.errorMessage = 'Error cargando los datos del usuario';
        console.error(error);
      } else {
        console.log('Datos del usuario:', user); // Aquí es donde se encuentra el usuario
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
      }
    } else {
      console.log('ID de usuario no proporcionado.');
    }
  }

  async updateUser() {
    if (!this.username || !this.email || !this.role) {
      console.log('Por favor complete todos los campos.');
      return;
    }

    // Verificar si el userId es válido antes de intentar actualizar
    if (!this.userId) {
      console.log('ID de usuario no encontrado:', this.userId);
      return;
    }

    const { error, data } = await this.usersService.updateUser(this.userId, {
      username: this.username,
      email: this.email,
      role: this.role,
    });

    if (error) {
      console.log('Error al actualizar el usuario:', error);
    } else {
      console.log('Usuario actualizado:', data);
      this.router.navigate(['/user/list']);
    }
  }
}
