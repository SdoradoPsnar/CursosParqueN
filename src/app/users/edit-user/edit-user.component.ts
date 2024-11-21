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

    if (!this.isValidUUID(this.userId)) {
      console.error('El ID proporcionado no es un UUID válido.');
      this.errorMessage = 'ID inválido.';
      return;
    }

    console.log('userId capturado:', this.userId);

    const { user, error } = await this.usersService.getUserById(this.userId);
    if (error) {
      this.errorMessage = 'Error cargando los datos del usuario.';
      console.error(error);
    } else {
      console.log('Datos del usuario:', user);
      this.username = user.username;
      this.email = user.email;
      this.role = user.role;
    }
  }

  isValidUUID(uuid: string): boolean {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  }

  // Función para obtener los datos del usuario
  async getUserData() {
    const { user, error } = await this.usersService.getUserById(this.userId!); // Aquí userId ya es un UUID válido
    if (error) {
      this.errorMessage = 'Error cargando los datos del usuario';
      console.error(error);
    } else {
      console.log('Datos del usuario:', user);
      this.username = user.username;
      this.email = user.email;
      this.role = user.role;
    }
  }

  // Función para actualizar los datos del usuario
  async updateUser() {
    try {
      const { error, data } = await this.usersService.updateUser(this.userId, {
        username: this.username,
        email: this.email,
        role: this.role,
      });

      if (error) {
        console.error('Error al actualizar el usuario:', error);
      } else {
        console.log('Usuario actualizado exitosamente:', data);
        this.router.navigate(['/user/list']); // Redirige después de actualizar
      }
    } catch (e) {
      console.error('Excepción al actualizar usuario:', e);
    }
  }

}
