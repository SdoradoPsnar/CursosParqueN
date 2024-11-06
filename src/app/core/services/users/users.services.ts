import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    );
  }

  async userList() {
    const { data: users, error } = await this.supabase
      .from('users')
      .select('*');
    return { users, error };
  }

  async createUser(email: string, password: string, role: string) {
    const { data, error: authError } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { error: authError };
    }

    const { error: dbError } = await this.supabase.from('users').insert({
      id: data.user?.id,
      email,
      role,
    });

    return { error: dbError };
  }

  async userDelete(userId: string) {
    const { error: dbError } = await this.supabase
      .from('users')
      .delete()
      .eq('id', userId);

    return { error: dbError };
  }
}
