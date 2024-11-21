import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories/categories.services';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent {

  categoriesList: any;

  constructor(private categoriesService: CategoriesService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    const result = await this.categoriesService.listCategories();
    this.categoriesList = result.categories;
  }

  async deleteCategory(categoryId: string) {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar esta categoria?'
    );
    if (confirmed) {
      const { error } = await this.categoriesService.deleteCategory(categoryId);
      if (!error) {
        this.categoriesList = this.categoriesList.filter((category: any) => category.id !== categoryId);
      } else {
        console.error('Error al eliminar la categoria :', error);
      }
    }
  }

  editCategory(categoryId: string) {
    this.router.navigate(['/categories/edit', categoryId]);
  }

}
