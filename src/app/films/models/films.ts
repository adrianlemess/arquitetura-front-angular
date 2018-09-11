export interface IFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  created: string;
}

export class Film {
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: string;
  created: string;
  characters?: string[];
  planets?: string[];
  starships?: string[];

  constructor(data: IFilm) {
    this.title = data.title;
    this.episodeId = data.episode_id;
    this.openingCrawl = data.opening_crawl;
    this.director = data.director;
    this.producer = data.producer;
    this.releaseDate = data.release_date;
    this.created = data.created;
    this.characters = data.characters;
    this.planets = data.planets;
    this.starships = data.starships;
  }

  get CompleteName() {
    return `Episode ${this.getEpisodeInRoman()} - ${this.title}`;
  }

  getEpisodeInRoman() {
    switch (this.episodeId) {
      case 1:
        return 'I';
      case 2:
        return 'II';
      case 3:
        return 'III';
      case 4:
        return 'IV';
      case 5:
        return 'V';
      case 6:
        return 'VI';
      case 7:
        return 'VII';
      case 8:
        return 'VIII';
      case 9:
        return 'IX';
      case 10:
        return 'X';
      default:
        return this.episodeId;
    }
  }
}
