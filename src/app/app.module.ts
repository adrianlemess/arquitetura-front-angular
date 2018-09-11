import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { UiModule } from './ui/ui.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    UiModule,
    StoreModule.forRoot(fromApp.reducers, { initialState: fromApp.getInitialState, metaReducers: fromApp.metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
