import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'create',
        loadChildren: () =>
          import('./create-category/createcategory.module').then(
            (m) => m.CreateCategoryModule
          ),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list-categories/listcategories.module').then((m) => m.ListCategoriesModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./edit-category/editcategory.module').then((m) => m.EditCategoryModule),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('src/app/courses/list-course/listcourse.module').then((m) => m.ListCourseModule),
      }
    ]),
  ],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
