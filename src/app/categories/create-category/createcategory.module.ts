import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { CreateCategoryComponent } from './create-category.component';
import { CreateCategoryRoutingModule } from './createcategory-routing.module';

@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    CreateCategoryRoutingModule,
  ],
})
export class CreateCategoryModule {}
