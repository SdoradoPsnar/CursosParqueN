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
      }
    ]),
  ],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
