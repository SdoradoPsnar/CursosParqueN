import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { EditCategoryComponent } from './edit-category.component';
import { EditCategoryRoutingModule } from './editcategory-routing.module';

@NgModule({
  declarations: [EditCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RouterModule,
    EditCategoryRoutingModule,
  ],
})
export class EditCategoryModule {}
