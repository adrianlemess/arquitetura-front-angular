import { StoreFilmService } from './services/store-film.service';
import { OpeningCrawlComponent } from './opening-crawl/opening-crawl.component';
import { FilmsRoutingModule } from './films-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmContainerComponent } from './film-container/film-container.component';
import { InformationComponent } from './information/information.component';
import { StarshipsComponent } from './starships/starships.component';
import { CharactersComponent } from './characters/characters.component';
import { PlanetsComponent } from './planets/planets.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FilmsRoutingModule,
    SharedModule
  ],
  providers: [
    StoreFilmService
  ],
  declarations: [
    FilmContainerComponent,
    InformationComponent,
    OpeningCrawlComponent,
    StarshipsComponent,
    CharactersComponent,
    PlanetsComponent
  ]
})
export class FilmsModule { }
