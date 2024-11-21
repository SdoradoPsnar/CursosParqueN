import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category.component';

const routes: Routes = [
  { path: '', component: CreateCategoryComponent }, // Ruta vacía
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCategoryRoutingModule {}
