import { SharedModule } from './../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './../../ui/side-menu/side-menu.component';
import { HeaderComponent } from './../../ui/header/header.component';
import { LayoutBaseComponent } from './../../ui/layout-base/layout-base.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [
    LayoutBaseComponent,
    HeaderComponent,
    SideMenuComponent
  ],
  exports: [
    LayoutBaseComponent,
    HeaderComponent,
    SideMenuComponent,
    SharedModule
  ],
})

export class UiTestingModule { }
