import { AppState, StateName } from './../../store/index';
import { Store } from '@ngrx/store';
import { Film } from './../models/films';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opening-crawl',
  templateUrl: './opening-crawl.component.html',
  styleUrls: ['./opening-crawl.component.scss']
})
export class OpeningCrawlComponent implements OnInit {
  public selectedFilm: Film;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(StateName.FILMS)
      .subscribe(data => {
        this.selectedFilm = data.selectedFilm;
      });
  }
}
