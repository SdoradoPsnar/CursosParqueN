import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

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

  async createUser(username: string, email: string, role: string) {
    try {
      // Inserta el usuario en la tabla "users"
      const { error: dbError } = await this.supabase.from('users').insert({
        username,
        email,
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
    // Validar si el ID es un UUID válido
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!isValidUUID.test(userId)) {
      console.error('ID no es un UUID válido:', userId);
      return { user: null, error: { message: 'ID no es un UUID válido.' } };
    }

    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error obteniendo usuario:', error.message);
      return { user: null, error };
    }

    console.log('Usuario obtenido:', data);
    return { user: data, error: null };
  }


  // Función para convertir un entero en un UUID
  private generateUUIDFromInteger(userId: number): string {
    const prefix = '00000000-0000-0000-0000-';
    const paddedId = userId.toString().padStart(12, '0'); // Asegura longitud de 12
    return prefix + paddedId;
  }

  async updateUser(
    userId: string, // UUID como string
    updatedData: { username?: string; email?: string; role?: string }
  ) {
    // Validar si el ID es un UUID válido
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!isValidUUID.test(userId)) {
      return { error: 'ID no es un UUID válido.', data: null };
    }

    const allowedFields = ['username', 'email', 'role'];
    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter(
        ([key, value]) => allowedFields.includes(key) && value !== undefined
      )
    );

    if (Object.keys(filteredData).length === 0) {
      console.error('No hay campos válidos para actualizar.');
      return { error: 'No hay campos válidos para actualizar.', data: null };
    }

    try {
      const { data, error, status } = await this.supabase
        .from('users')
        .update(filteredData)
        .eq('id', userId) // Comparación con UUID
        .select();

      if (error) {
        return { error: error.message, data: null };
      }

      return { error: null, data };
    } catch (e) {
      return { error: 'Error inesperado durante la actualización.', data: null };
    }
  }

  async getInstructors() {
    const { data: instructors, error } = await this.supabase
      .from('users')
      .select('id, username')
      .eq('role', 'instructor');

    return { instructors, error };
  }

}
