import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { AdminComponent } from './admin/admin.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { ItemsComponent } from './admin/items/items.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { AuthGaurdService } from './shared/auth/auth-gaurd.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'items',
        pathMatch: 'full'
      },
      {
        path: 'items',
        component: ItemsComponent
      },
      {
        path: 'add-item',
        component: AddItemComponent
      },
      {
        path: 'edit-item/:id',
        component: EditItemComponent
      }
    ],
    canActivate: [AuthGaurdService]
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
