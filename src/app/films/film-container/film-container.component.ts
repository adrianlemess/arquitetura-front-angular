import { distinctUntilChanged, debounceTime, take } from 'rxjs/operators';
import { AppState, fromFilmActions } from './../../store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreFilmService } from '../services/store-film.service';

@Component({
  selector: 'app-film-container',
  templateUrl: './film-container.component.html',
  styleUrls: ['./film-container.component.scss']
})
export class FilmContainerComponent implements OnInit {

  public subscriptionRouterEvents: Subscription;
  public subscriptionStoreService: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _storeFilm: StoreFilmService,
    private _store: Store<AppState>
    ) { }

    ngOnInit() {
      this.subscribeRoute();
    }

    public subscribeRoute() {
      this._route.params
        .subscribe( params => this.setFilmDataById(params.idFilm) );
    }

    /**
    *  Should call fillStateWithFilmSelected with debounceTime and distinct until changed in case
    *  of the user change the films constantly
    * @param {number} idFilm - film id of route param
    */
    public setFilmDataById(idFilm: number) {
      this.setLoading(true);
      this._storeFilm.fillStateWithFilmSelected(idFilm)
      .pipe(
        take(1)
        )
        .subscribe(() => {
          this.setLoading(false);
        }, () => {
          this.setLoading(false);
        });
      }

    public setLoading(flag) {
        this._store.dispatch(new fromFilmActions.SetFieldFilm({
          index: 'loadingData', value: flag
        })
      );
    }
  }
