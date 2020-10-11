import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { DueEditComponent } from './due-edit/due-edit.component';
import { DueListComponent } from './due-list/due-list.component';
import { CarDueListComponent } from './car-due-list/car-due-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/car-list', pathMatch: 'full' },
  {
    path: 'car-list',
    component: CarListComponent
  },
  {
    path: 'car-add',
    component: CarEditComponent
  },
  {
    path: 'car-edit/:id',
    component: CarEditComponent
  },
  {
    path: 'due-add',
    component: DueEditComponent
  },
  {
    path: 'due-edit/:id',
    component: DueEditComponent
  },
  {
    path: 'due-list',
    component: DueListComponent
  },
  {
    path: 'car-due-list',
    component: CarDueListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
