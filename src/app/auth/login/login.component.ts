import { Component } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    const session = await this.supabaseService.getSession();
    if (session) {
      this.router.navigate(['/home']);
    }
  }

  async onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    try {
      const { user, session, error } = await this.supabaseService.signIn(
        this.email,
        this.password
      );

      if (error) {
        console.error('Error signing in:', error);
        this.errorMessage = error.message;
        this.loading = false;
        return;
      }

      this.router.navigate(['/home']);

      this.email = '';
      this.password = '';
      this.errorMessage = null;

      console.log('User:', user);
      console.log('Session:', session);
    } catch (err) {
      console.error('Unexpected error:', err);
      this.errorMessage =
        'Ocurrió un error inesperado, por favor intente nuevamente.';
      this.loading = false;
    } finally {
      this.loading = false;
    }
  }
}
