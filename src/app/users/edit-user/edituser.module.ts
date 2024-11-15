import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user.component';
import { EditUserRoutingModule } from './edituser-routing.module';

@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    RouterModule,
    EditUserRoutingModule,
  ],
})
export class EditUserModule {}
