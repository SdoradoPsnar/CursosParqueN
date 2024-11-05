import { NgModule } from "@angular/core";
import { ListUserComponent } from "./list-user.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ListUserRoutingModule } from "./listuser-routing.module";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({declarations:[ListUserComponent], imports:[CommonModule, SharedModule, ListUserRoutingModule, TableModule, ButtonModule]})

export class ListUserModule{}
