import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/core/services/courses/courses.services';
import { UsersService } from 'src/app/core/services/users/users.services';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit{

  createCourseForm: FormGroup;
  categoryId: string | null = null;
  instructors: { id: string, username: string }[] = [];

  title: string = '';
  description: string = '';
  instructor_id: string = '';
  category_id: string = '';
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.createCourseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      instructor_id: ['', Validators.required],
      category_id: [''],
    });
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');

    const isValidUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (this.categoryId && isValidUUID.test(this.categoryId)) {
      this.createCourseForm.patchValue({ category_id: this.categoryId });
    } else {
      console.error('El categoryId proporcionado no es un UUID válido:', this.categoryId);
      this.errorMessage = 'Categoría inválida.';
    }

    this.loadInstructors();
  }

  async loadInstructors() {
    const { users, error } = await this.usersService.userList();
    if (error || !users) {
      this.errorMessage = 'Error al cargar los instructores';
      return;
    }
    this.instructors = users
      .filter(user => user.role === 'instructor')
      .map(user => ({ id: user.id, username: user.username }));

    if (this.instructors.length === 0) {
      this.errorMessage = 'No se encontraron instructores.';
    }
  }



  async createCourse() {
    if (this.createCourseForm.valid) {
      const { title, description, instructor_id, category_id } = this.createCourseForm.value;

      const { error } = await this.coursesService.createCourse(
        title,
        description,
        instructor_id,
        category_id
      );

      if (!error) {
        alert('Curso creado con éxito');
        this.router.navigate(['/courses/list', this.categoryId]);
      } else {
        console.error('Error al crear el curso:', error);
      }
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }


}
