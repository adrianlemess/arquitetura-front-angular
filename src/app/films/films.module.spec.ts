import { FilmsModule } from './films.module';

describe('FilmsModule', () => {
  let filmsModule: FilmsModule;

  beforeEach(() => {
    filmsModule = new FilmsModule();
  });

  it('should create an instance', () => {
    expect(filmsModule).toBeTruthy();
  });
});
