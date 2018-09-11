import { Observable } from 'rxjs';
import { State } from './../../store/film/film.reducer';
import { AppState, StateName } from './../../store/index';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  public filmState$: Observable<State>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.filmState$ = this.store.select(StateName.FILMS);
  }

}
