import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'list',
        loadChildren: () =>
          import('./list-course/listcourse.module').then((m) => m.ListCourseModule),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create-course/createcourse.module').then((m) => m.CreateCourseModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./edit-course/editcourse.module').then((m) => m.EditCourseModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
