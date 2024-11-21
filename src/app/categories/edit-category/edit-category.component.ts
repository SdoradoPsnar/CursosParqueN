import { Component, OnInit} from '@angular/core';
import { CategoriesService } from 'src/app/core/services/categories/categories.services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryId!: string;
  name: string = '';
  errorMessage: string | null = null;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.categoryId = this.route.snapshot.params['id'];

    if (!this.isValidUUID(this.categoryId)) {
      console.error('El ID proporcionado no es un UUID válido.');
      this.errorMessage = 'ID inválido.';
      return;
    }

    console.log('category Id capturado:', this.categoryId);

    const { category, error } = await this.categoriesService.getCategoryById(this.categoryId);
    if (error) {
      this.errorMessage = 'Error cargando los datos de la categoria.';
      console.error(error);
    } else {
      console.log('Datos de la categoria:', category);
      this.name = category.name;
    }
  }

  isValidUUID(uuid: string): boolean {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  }

  // Función para obtener los datos del usuario
  async getCategoryData() {
    const { category, error } = await this.categoriesService.getCategoryById(this.categoryId!); // Aquí userId ya es un UUID válido
    if (error) {
      this.errorMessage = 'Error cargando los datos de la categoria';
      console.error(error);
    } else {
      console.log('Datos de la categoria:', category);
      this.name = category.name;
    }
  }

  // Función para actualizar los datos del usuario
  async updateCategory() {
    try {
      const { error, data } = await this.categoriesService.updateCategory(this.categoryId, {
        name: this.name,
      });

      if (error) {
        console.error('Error al actualizar la categoria:', error);
      } else {
        console.log('Categoria actualizada exitosamente:', data);
        this.router.navigate(['/categories/list']); // Redirige después de actualizar
      }
    } catch (e) {
      console.error('Excepción al actualizar la categoria:', e);
    }
  }

}
