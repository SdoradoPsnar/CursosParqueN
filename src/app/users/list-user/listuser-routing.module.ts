import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ListUserComponent } from "./list-user.component";

@NgModule({
    imports:[RouterModule.forChild([{path:'',
    component: ListUserComponent}])],
    exports:[RouterModule]
  })

export class ListUserRoutingModule{}
