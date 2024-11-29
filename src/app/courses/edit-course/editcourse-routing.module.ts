import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCourseComponent } from './edit-course.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: ':categoryId/:id', component: EditCourseComponent }]),
  ],
  exports: [RouterModule],
})
export class EditCourseRoutingModule {}

