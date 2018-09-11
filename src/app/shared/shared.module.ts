import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { CardComponent } from './components/card/card.component';
import { SectionComponent } from './components/section/section.component';
import { Tela404Component } from './components/tela404/tela404.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoadingComponent,
    CardComponent,
    SectionComponent,
    Tela404Component,
    TabelaComponent,
    PaginacaoComponent
  ],
  exports: [
    LoadingComponent,
    CardComponent,
    SectionComponent,
    Tela404Component,
    TabelaComponent,
    PaginacaoComponent
  ],
})
export class SharedModule { }
