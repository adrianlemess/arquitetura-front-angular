import { MenuItem } from './../models/menu';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input()
  public menuItens: MenuItem[];

  constructor() { }

  ngOnInit() {
    console.log(this.menuItens);
  }

}
