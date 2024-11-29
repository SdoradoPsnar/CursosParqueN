import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY
    );
  }

  async listCourses() {
    const { data: courses, error } = await this.supabase
      .from('courses')
      .select('*');
    return { courses, error };
  }

  async createCourse(title: string, description: string, instructor_id:string, category_id:string) {
    try {
      const { error: dbError } = await this.supabase.from('courses').insert({
        title,
        description,
        instructor_id,
        category_id
      });

      if (dbError) {
        throw { message: dbError.message };
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  }

  async deleteCourse(courseId: string) {
    const { error: dbError } = await this.supabase
      .from('courses')
      .delete()
      .eq('id', courseId);

    return { error: dbError };
  }

  async getCourseById(courseId: string) {
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!isValidUUID.test(courseId)) {
      console.error('ID no es un UUID válido:', courseId);
      return { course: null, error: { message: 'ID no es un UUID válido.' } };
    }

    const { data, error } = await this.supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error) {
      console.error('Error obteniendo curso:', error.message);
      return { course: null, error };
    }

    console.log('Curso obtenido:', data);
    return { course: data, error: null };
  }

  async updateCourse(courseId: string, updatedData: { title?: string; description?: string; instructor_id?: string; })
  {
    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!isValidUUID.test(courseId)) {
      return { error: 'ID no es un UUID válido.', data: null };
    }

    const allowedFields = ['title', 'description', 'instructor_id'];
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
        .from('courses')
        .update(filteredData)
        .eq('id', courseId)
        .select();

      if (error) {
        return { error: error.message, data: null };
      }

      return { error: null, data };
    } catch (e) {
      return { error: 'Error inesperado durante la actualización.', data: null };
    }
  }

  async listCoursesByCategory(categoryId: string) {
    const { data: courses, error } = await this.supabase
      .from('courses')
      .select('*')
      .eq('category_id', categoryId);
    return { courses, error };
  }
}
