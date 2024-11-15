import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: ':id', component: EditUserComponent }]),
  ],
  exports: [RouterModule],
})
export class EditUserRoutingModule {}

const routes: Routes = [{ path: '', component: EditUserComponent }];
