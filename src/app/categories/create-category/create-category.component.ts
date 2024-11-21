import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
name: string = '';
  errorMessage: string | null = null;


  constructor(private categoriesService: CategoriesService, private router: Router) {}

  async createCategory() {
    if (!this.name) {
      this.errorMessage = 'Por favor complete todos los campos.';
      return;
    }

    const { error } = await this.categoriesService.createCategory(
      this.name
    );
    if (error && (error as { message: string }).message) {
      this.errorMessage = (error as { message: string }).message;
      console.error('Error creando la categoria: ', error);
    } else {
      this.router.navigate(['/categories/list']);
    }
  }


}
