import { Component } from '@angular/core';
import { SupabaseService } from '../../core/services/users/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onLogin() {
    try {
      const { user, session, error } = await this.supabaseService.signIn(this.email, this.password);
      if (error) {
        console.error('Error signing in:', error);
        return;
      }
      else{
        this.router.navigate(['/user/list']);
      }
      console.log('User:', user);
      console.log('Session:', session);
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }
}
