import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';


const routerOptions: ExtraOptions={anchorScrolling: 'enabled'};

const routes: Routes = [
   {path:'user', loadChildren:()=>import('./users/users.module').then((m)=>m.UsersModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
