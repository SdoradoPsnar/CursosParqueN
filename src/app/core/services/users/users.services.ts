import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import * as bcrypt from 'bcryptjs';

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

  async createUser(
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      // Encripta la contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(password, 10);

      // Inserta el usuario en la tabla "users"
      const { error: dbError } = await this.supabase.from('users').insert({
        username,
        email,
        password: hashedPassword,
        role,
      });

      if (dbError) {
        throw { message: dbError.message };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  async userDelete(userId: string) {
    const { error: dbError } = await this.supabase
      .from('users')
      .delete()
      .eq('id', userId);

    return { error: dbError };
  }

  async getUserById(userId: string) {
    // Obtener el usuario desde Supabase
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single(); // aqui se supone me debe devolver un objeto

    if (error) {
      console.error('Error obteniendo usuario:', error.message);
      return { user: null, error }; // capturé error o caso en el que el usuario sea nulo
    }

    return { user: data, error: null }; // devuelvo el usuario en user
  }

  async updateUser(
    userId: string,
    updatedData: { username?: string; email?: string; role?: string }
  ) {
    // Solo actualizar username, email, role
    const allowedFields = ['username', 'email', 'role'];
    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter(([key, value]) =>
        allowedFields.includes(key)
      )
    );

    console.log('Campos que se enviarán a Supabase:', filteredData);

    // 
    const { data, error, status } = await this.supabase
      .from('users')
      .update(filteredData)
      .eq('id', userId)
      .select(); // Agregar .select() para obtener los datos actualizados

    // Registra la respuesta completa para depuración
    console.log('Respuesta completa de Supabase:', { data, error, status });

    if (error) {
      console.error('Error actualizando usuario en Supabase:', error.message);
      return { error };
    }

    console.log('Datos actualizados:', data);
    console.log('Usuario actualizado exitosamente en Supabase');
    return { error: null, data }; // Devuelve los datos actualizados
  }
}
