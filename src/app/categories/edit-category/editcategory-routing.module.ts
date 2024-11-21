import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from './edit-category.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: ':id', component: EditCategoryComponent }]),
  ],
  exports: [RouterModule],
})
export class EditCategoryRoutingModule {}

const routes: Routes = [{ path: '', component: EditCategoryComponent }];
