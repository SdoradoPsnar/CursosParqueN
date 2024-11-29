import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './create-course.component';

const routes: Routes = [
  { path: '', component: CreateCourseComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild([{ path: ':categoryId', component: CreateCourseComponent }]),
  ],
  exports: [RouterModule],
})
export class CreateCourseRoutingModule {}
