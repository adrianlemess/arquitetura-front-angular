export interface IMenuItem {
  label: string;
  routerLink: Array<number | string>;
  queryParams?: any;
  icon?: string;
}

export class MenuItem implements IMenuItem {
  label: string;
  routerLink: Array<number | string>;
  queryParams?: any;
  icon?: string;

  constructor(menu: IMenuItem) {
    this.label = menu.label;
    this.routerLink = menu.routerLink;
    this.queryParams = menu.queryParams;
    this.icon = menu.icon;
  }
}
