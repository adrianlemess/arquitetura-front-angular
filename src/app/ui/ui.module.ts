import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutBaseComponent } from './layout-base/layout-base.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LayoutBaseComponent,
    HeaderComponent,
    SideMenuComponent,
    NavbarComponent
  ],
  exports: [
    LayoutBaseComponent,
    HeaderComponent,
    SideMenuComponent
  ],

})
export class UiModule { }
