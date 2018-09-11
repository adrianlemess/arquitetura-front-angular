import { Tela404Component } from './../shared/components/tela404/tela404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'films/1',
    pathMatch: 'full'
  },
  {
    path: 'films/:idFilm',
    loadChildren: '../films/films.module#FilmsModule',
  },
  {
    path: '**',
    component: Tela404Component
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
