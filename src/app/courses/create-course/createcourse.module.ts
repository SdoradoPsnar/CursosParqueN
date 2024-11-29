import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { CreateCourseComponent } from './create-course.component';
import { CreateCourseRoutingModule } from './createcourse-routing.module';

@NgModule({
  declarations: [CreateCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RouterModule,
    CreateCourseRoutingModule,
  ],
})
export class CreateCourseModule {}
