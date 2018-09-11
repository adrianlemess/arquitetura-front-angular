import { Subscription } from 'rxjs';
import { AppState, fromFilmActions, StateName } from './store/index';
import { MenuItem } from './ui/models/menu';
import { FilmsService } from './services/films.service';
import { Film } from './films/models';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public loadingGlobal = false;
  public menuItens: MenuItem[] = [];
  public navbarMenuItens: MenuItem[] = null;
  public paramId: any;
  public films: Film[];
  public loadingData: boolean;
  public subscriptionStore: Subscription;

  constructor(
    private filmsService: FilmsService,
    private store: Store<AppState>
    ) {}

  ngOnInit() {
    this.getFilms();
    this.selectStoreFilms();
  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();
  }

  public selectStoreFilms() {
    this.subscriptionStore = this.store.select(StateName.FILMS)
      .subscribe((state) => {
        // Workaround to fix bug property has been check
        setTimeout(() => {
          this.loadingData = state.loadingData;
        });
        if (state.selectedFilm && state.selectedFilm.episodeId && this.paramId !== state.selectedFilm.episodeId) {
          this.paramId = state.selectedFilm.episodeId;
          // Workaround to fix bug property has been check
          setTimeout(() => {
            this.navbarMenuItens = this.mountNavBarMenuItens(state.selectedFilm.episodeId);
          });
        }
      });
  }

  public mountNavBarMenuItens(idParam): MenuItem[] {
    return [
      {
        label: 'Informations',
        routerLink: ['films', idParam, 'informations'],
        icon: 'swg swg-yoda-3'
      },
      {
        label: 'Characters',
        routerLink: ['films', idParam, 'characters'],
        icon: 'swg swg-macewindu'
      },
      {
        label: 'Planets',
        routerLink: ['films', idParam, 'planets'],
        icon: 'swg swg-deathstar-o'
      },
      {
        label: 'Starships',
        routerLink: ['films', idParam, 'starships'],
        icon: 'swg swg-xwing'
      },
      {
        label: 'Opening Crawl',
        routerLink: ['films', idParam, 'opening-crawl'],
        icon: 'swg swg-sw-alt-2'
      }
    ];
  }

  public getFilms() {
    this.loadingGlobal = true;
    this.filmsService.getFilms()
      .subscribe(
        films => {
          this.loadingGlobal = false;
          this.store.dispatch(new fromFilmActions.SetFilms(films));

          this.menuItens = this.mountMenuItem(films);
        },
        (err) => {
          this.loadingGlobal = false;
        }
      );
  }

  public mountMenuItem(films: Film[]): MenuItem[] {
    return films.map(film => {
      return {
        label: film.title,
        routerLink: ['films', film.episodeId]
      };
    });

  }

  get loading() {
    return this.loadingGlobal || this.loadingData;
  }
}
