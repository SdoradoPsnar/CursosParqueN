import { NgModule } from "@angular/core";
import { ListCourseComponent } from "./list-course.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { ListCourseRoutingModule } from "./listcourse-routing.module";
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({declarations:[ListCourseComponent], imports:[CommonModule, SharedModule, ListCourseRoutingModule, TableModule, ButtonModule]})

export class ListCourseModule{}
