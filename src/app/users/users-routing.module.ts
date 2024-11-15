import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'create',
        loadChildren: () =>
          import('./create-user/createuser.module').then(
            (m) => m.CreateUserModule
          ),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list-user/listuser.module').then((m) => m.ListUserModule),
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('./edit-user/edituser.module').then((m) => m.EditUserModule),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
