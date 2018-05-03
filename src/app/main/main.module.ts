import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CurrencyService } from './services/currency.service';

import { MainComponent } from './main.component';
import { CurrencyComponent } from './components/currency/currency.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [MainComponent, CurrencyComponent],
  exports: [MainComponent],
  providers: [CurrencyService]
})
export class MainModule { }
