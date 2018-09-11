import { StoreModule, Store } from '@ngrx/store';
import { Film } from './films/models/films';
import { FilmsMockService } from './services/films-mock.service';
import { FilmsService } from './services/films.service';
import { filmsData } from './services/mocks/film.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { UiTestingModule } from './testing/modules/ui-testing.module';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, throwError } from 'rxjs';
import { filmReducer, INITIAL_STATE as InitialStateFilm } from './store/film/film.reducer';
import { AppState, fromFilmActions } from './store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let filmService: FilmsService;
  let store: Store<AppState>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        UiTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({ films: filmReducer },
          {
            initialState: {
              films: InitialStateFilm
            }
          }),
      ],
      providers: [
        { provide: FilmsService, useClass: FilmsMockService }
      ],
      declarations: [
        AppComponent,
      ],
      schemas: [],
    }).compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      filmService = TestBed.get(FilmsService);
      store = TestBed.get(Store);
      fixture.detectChanges();
    });
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('ngOnInit() - Should calling method getFilms and selectStoreFilms', () => {
    spyOn(component, 'getFilms');
    spyOn(component, 'selectStoreFilms');

    component.ngOnInit();

    expect(component.getFilms).toHaveBeenCalled();
    expect(component.selectStoreFilms).toHaveBeenCalled();
  });

  it('Should fill the menuItems variable with an array of menuItems from films result', fakeAsync(() => {
    spyOn(filmService, 'getFilms').and.returnValue(of(filmsData.films.map(film => new Film(film))));

    component.getFilms();
    tick(10);
    expect(component.menuItens).toEqual([
      {
        label: filmsData.films[0].title,
        routerLink: ['films', filmsData.films[0].episode_id]
      },
      {
        label: filmsData.films[1].title,
        routerLink: ['films', filmsData.films[1].episode_id]
      }
    ]);
  }));

  it('selectStoreFilms() - Should call mountNavBarItens', fakeAsync(() => {
    const selectedFilm = new Film(filmsData.films[0]);
    spyOn(component, 'mountNavBarMenuItens');
    store.dispatch(new fromFilmActions.SetSelectedFilm(selectedFilm));

    component.selectStoreFilms();
    tick(10);

    expect(component.mountNavBarMenuItens).toHaveBeenCalled();

  }));

  it('mountNavBarMenuItens() - Should return a valid object', () => {
    const navBarMenuItens = component.mountNavBarMenuItens(15);

    expect(navBarMenuItens).toEqual(
      [
        {
          label: 'Informations',
          routerLink: ['films', 15, 'informations'],
          icon: 'swg swg-yoda-3'
        },
        {
          label: 'Characters',
          routerLink: ['films', 15, 'characters'],
          icon: 'swg swg-macewindu'
        },
        {
          label: 'Planets',
          routerLink: ['films', 15, 'planets'],
          icon: 'swg swg-deathstar-o'
        },
        {
          label: 'Starships',
          routerLink: ['films', 15, 'starships'],
          icon: 'swg swg-xwing'
        },
        {
          label: 'Opening Crawl',
          routerLink: ['films', 15, 'opening-crawl'],
          icon: 'swg swg-sw-alt-2'
        }
      ]
    );
  });

  it('Should dispatch a setFilms action with the films', fakeAsync(() => {
    const films = filmsData.films.map(film => new Film(film));
    spyOn(filmService, 'getFilms').and.returnValue(of(films));
    spyOn(store, 'dispatch');
    component.getFilms();
    tick(10);

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(new fromFilmActions.SetFilms(films));

  }));

  it('Should call mountMenuItem', fakeAsync(() => {
    const films = filmsData.films.map(film => new Film(film));
    spyOn(filmService, 'getFilms').and.returnValue(of(films));
    spyOn(component, 'mountMenuItem');
    component.getFilms();
    tick(10);

    expect(component.mountMenuItem).toHaveBeenCalled();
    expect(component.mountMenuItem).toHaveBeenCalledWith(films);

  }));

  it('Should set loading false even if getFilms from filmsService give error', fakeAsync(() => {
    spyOn(filmService, 'getFilms').and.returnValue(throwError('err'));

    component.getFilms();

    tick(10);

    expect(component.loadingGlobal).toBeFalsy();
  }));

  it('GET loading - Should return true when loadingData is true', () => {
    component.loadingData = true;
    component.loadingGlobal = false;

    expect(component.loading).toBeTruthy();
  });

  it('GET loading - Should return true when loadingGlobal is true', () => {
    component.loadingData = false;
    component.loadingGlobal = true;

    expect(component.loading).toBeTruthy();
  });

  it('GET loading - Should return false when loadingData and loadingGlobal is false', () => {
    component.loadingData = false;
    component.loadingGlobal = false;

    expect(component.loading).toBeFalsy();
  });

  afterAll(() => {
    component.loadingData = false;
    component.loadingGlobal = false;
    component.menuItens = null;
    fixture.detectChanges();
  });

});
