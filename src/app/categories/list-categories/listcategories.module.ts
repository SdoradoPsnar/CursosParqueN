import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListCategoriesRoutingModule } from './listcategories-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ListCategoriesComponent } from './list-categories.component';

@NgModule({
  declarations: [ListCategoriesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ListCategoriesRoutingModule,
    TableModule,
    ButtonModule
  ],
})
export class ListCategoriesModule {}
