export interface IStarship {
  model: string;
  name: string;
  cargo_capacity: string;
  cost_in_credits: string;
  hyperdrive_rating: string;
}

export class Starship {
  model: string;
  name: string;
  cargoCapacity: string;
  costInCredits: string;
  hyperdriveRating: string;

  constructor(model: IStarship) {
    this.name = model.name;
    this.model = model.model;
    this.cargoCapacity = model.cargo_capacity;
    this.costInCredits = model.cost_in_credits;
    this.hyperdriveRating = model.hyperdrive_rating;
  }
}
