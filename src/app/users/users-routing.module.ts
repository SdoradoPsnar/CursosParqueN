import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

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
    ]),
  ],
  exports: [RouterModule],
})



export class UsersRoutingModule{}
