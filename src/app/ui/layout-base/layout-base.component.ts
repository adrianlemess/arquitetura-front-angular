import { MenuItem } from './../models/menu';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout-base',
  templateUrl: './layout-base.component.html',
  styleUrls: ['./layout-base.component.scss']
})
export class LayoutBaseComponent implements OnInit {
  @Input()
  public sideMenuItens: MenuItem[];

  @Input()
  public navbarMenuItens: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
