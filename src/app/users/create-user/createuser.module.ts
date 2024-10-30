import { NgModule } from "@angular/core";
import { CreateUserComponent } from "./create-user.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { CreateUserRoutingModule } from "./createuser-routing.module";

@NgModule({declarations:[CreateUserComponent], imports:[CommonModule, SharedModule, CreateUserRoutingModule]})

export class CreateUserModule{}
