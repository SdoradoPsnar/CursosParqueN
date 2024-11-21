import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    );
  }

  async listCategories() {
    const { data: categories, error } = await this.supabase
      .from('categories')
      .select('*');
    return { categories, error };
  }

  async createCategory(name: string) {
    try {
      const { error: dbError } = await this.supabase.from('categories').insert({
        name
      });

      if (dbError) {
        throw { message: dbError.message };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  async deleteCategory(categoryId: string) {
    const { error: dbError } = await this.supabase
      .from('categories')
      .delete()
      .eq('id', categoryId);

    return { error: dbError };
  }

  async getCategoryById(categoryId: string) {
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!isValidUUID.test(categoryId)) {
      console.error('ID no es un UUID válido:', categoryId);
      return { category: null, error: { message: 'ID no es un UUID válido.' } };
    }

    const { data, error } = await this.supabase
      .from('categories')
      .select('*')
      .eq('id', categoryId)
      .single();

    if (error) {
      console.error('Error obteniendo categoria:', error.message);
      return { category: null, error };
    }

    console.log('Categoria obtenido:', data);
    return { category: data, error: null };
  }

  async updateCategory(
    categoryId: string,
    updatedData: { name?: string;}
  ) {
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!isValidUUID.test(categoryId)) {
      return { error: 'ID no es un UUID válido.', data: null };
    }

    const allowedFields = ['name'];
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
        .from('categories')
        .update(filteredData)
        .eq('id', categoryId)
        .select();

      if (error) {
        return { error: error.message, data: null };
      }

      return { error: null, data };
    } catch (e) {
      return { error: 'Error inesperado durante la actualización.', data: null };
    }
  }
}
