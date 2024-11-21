import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListCategoriesComponent } from "./list-categories.component";

@NgModule({
    imports:[RouterModule.forChild([{path:'',
    component: ListCategoriesComponent}])],
    exports:[RouterModule]
  })

export class ListCategoriesRoutingModule{}
