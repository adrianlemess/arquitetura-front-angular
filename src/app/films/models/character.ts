export interface ICharacter {
  gender: string;
  name: string;
  skin_color: string;
  eye_color: string;
}

export class Character {
  gender: string;
  name: string;
  skinColor: string;
  eyeColor: string;

  constructor(model: ICharacter) {
    this.gender = model.gender;
    this.name = model.name;
    this.skinColor = model.skin_color;
    this.eyeColor = model.eye_color;
  }
}
