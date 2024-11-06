import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = createClient(
    environment.SUPABASE_URL,
    environment.SUPABASE_KEY
  );

  async isLoggedIn(): Promise<boolean> {
    const { data: user } = await this.supabase.auth.getUser();
    return !!user;
  }

  getSupabase() {
    return this.supabase;
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error.message);
      throw new Error('No se pudo cerrar la sesión');
    }
  }
}
