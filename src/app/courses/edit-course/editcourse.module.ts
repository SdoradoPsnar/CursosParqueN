import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditCourseComponent } from './edit-course.component';
import { EditCourseRoutingModule } from './editcourse-routing.module';

@NgModule({
  declarations: [EditCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    RouterModule,
    EditCourseRoutingModule,
  ],
})
export class EditCourseModule {}
