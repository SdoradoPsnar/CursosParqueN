import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/core/services/courses/courses.services';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit{

  coursesList: any;
  categoryId: string | null = null;

  constructor(private coursesService: CoursesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (this.categoryId) {
      this.loadCoursesByCategory(this.categoryId);
    } else {
      this.loadCourses();
    }
  }

  async loadCoursesByCategory(categoryId: string) {
    const result = await this.coursesService.listCoursesByCategory(categoryId);
    this.coursesList = result.courses;
  }

  async loadCourses() {
    const result = await this.coursesService.listCourses();
    this.coursesList = result.courses;
  }

  async deleteCourse(courseId: string) {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este curso?'
    );
    if (confirmed) {
      const { error } = await this.coursesService.deleteCourse(courseId);
      if (!error) {
        this.coursesList = this.coursesList.filter((course: any) => course.id !== courseId);
      } else {
        console.error('Error al eliminar el curso:', error);
      }
    }
  }

  editCourse(courseId: string) {
    if (this.categoryId) {
      this.router.navigate(['/courses/edit', this.categoryId, courseId]);
    }
  }

}
