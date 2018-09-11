export interface IPlanet {
  climate: string;
  name: string;
  orbital_period: string;
  population: string;
  gravity: string;
  terrain: string;
}

export class Planet {
  climate: string;
  name: string;
  orbitalPeriod: string;
  population: string;
  gravity: string;
  terrain: string;

  constructor(model: IPlanet) {
    this.climate = model.climate;
    this.name = model.name;
    this.orbitalPeriod = model.orbital_period;
    this.population = model.population;
    this.gravity = model.gravity;
    this.terrain = model.terrain;
  }
}

