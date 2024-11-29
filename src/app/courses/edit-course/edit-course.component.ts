import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/core/services/courses/courses.services';
import { UsersService } from 'src/app/core/services/users/users.services';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  editCourseForm: FormGroup;
  courseId!: string;
  categoryId: string = '';
  errorMessage: string | null = null;
  instructors: { id: string, username: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.editCourseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      instructor_id: ['', Validators.required],
      category_id: ['']
    });
  }

  async ngOnInit() {
    console.log('EditCourseComponent inicializado');
    this.courseId = this.route.snapshot.params['id'];
    this.categoryId = this.route.snapshot.params['categoryId'];

    // Validación del ID de curso
    if (!this.isValidUUID(this.courseId)) {
      console.error('El ID proporcionado no es un UUID válido.');
      this.errorMessage = 'ID inválido.';
      return;
    }

    console.log('courseId capturado:', this.courseId);

    // Cargar los instructores y los datos del curso
    await this.loadInstructors();
    await this.loadCourseData();
  }

  // Método para verificar si el ID es un UUID válido
  isValidUUID(uuid: string): boolean {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  }

  // Cargar los instructores
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

  // Cargar los datos del curso
  async loadCourseData() {
    const { course, error } = await this.coursesService.getCourseById(this.courseId);
    if (error) {
      this.errorMessage = 'Error cargando los datos del curso.';
      console.error(error);
    } else {
      console.log('Datos del curso:', course);
      this.editCourseForm.patchValue({
        title: course.title,
        description: course.description,
        instructor_id: course.instructor_id,
        category_id: this.categoryId
      });
    }
  }

  // Actualizar el curso
  async updateCourse() {
    if (this.editCourseForm.valid) {
      const { title, description, instructor_id, category_id } = this.editCourseForm.value;

      const { error } = await this.coursesService.updateCourse(
        this.courseId,
        { title, description, instructor_id }
      );

      if (!error) {
        alert('Curso actualizado con éxito');
        this.router.navigate(['/courses/list', this.categoryId]);
      } else {
        console.error('Error al actualizar el curso:', error);
      }
    } else {
      alert('Por favor completa todos los campos requeridos.');
    }
  }
}
