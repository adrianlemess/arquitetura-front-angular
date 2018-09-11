import { OpeningCrawlComponent } from './opening-crawl/opening-crawl.component';
import { PlanetsComponent } from './planets/planets.component';
import { CharactersComponent } from './characters/characters.component';
import { StarshipsComponent } from './starships/starships.component';
import { InformationComponent } from './information/information.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmContainerComponent } from './film-container/film-container.component';


export const routes: Routes = [
  {
    path: '',
    component: FilmContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'informations'
      },
      {
        path: 'informations',
        component: InformationComponent
      },
      {
        path: 'opening-crawl',
        component: OpeningCrawlComponent
      },
      {
        path: 'starships',
        component: StarshipsComponent
      },
      {
        path: 'characters',
        component: CharactersComponent
      },
      {
        path: 'planets',
        component: PlanetsComponent
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class FilmsRoutingModule {

}
