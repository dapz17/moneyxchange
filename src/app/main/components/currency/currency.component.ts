import { CurrencyResponse } from './../../models/currency';
import { CurrencyService } from './../../services/currency.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mxc-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  sourceCurrency: number;
  targetCurrency: number;
  exchangeFactor: number;
  exchangeLife: number;

  loadinExchange: boolean;

  constructor(
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.sourceCurrency = 0;
    this.targetCurrency = 0;
    this.loadinExchange = false;
    this.exchangeFactor = 0.83389;
    this.exchangeLife = 0;
  }

  changeSourceCurrency(event) {
    const value = event.target.value;
    if ( !isNaN(value) && value !== '' ) {
      this.sourceCurrency = value;
    } else {
      this.sourceCurrency = 0;
    }
  }
  calculateExchange() {
    if (!this.loadinExchange && this.sourceCurrency > 0) {
      this.loadinExchange = true;
      if (this.exchangeLife > 0 && ( Date.now() - this.exchangeLife ) < 600000) {
        this.targetCurrency = this.sourceCurrency * this.exchangeFactor;
        this.loadinExchange = false;
      } else {
        this.getExchangeFactor();
      }
    }
  }
  getExchangeFactor() {
    this.currencyService.getExchange('USD', 'EUR')
    .subscribe( (data: CurrencyResponse) => {
      this.exchangeFactor = data.rates['EUR'];
      this.targetCurrency = this.sourceCurrency * this.exchangeFactor;
      this.exchangeLife = Date.now();
      this.loadinExchange = false;
    });
  }
  get sourceCurrencyFormatted() {
    const value = (this.sourceCurrency > 0) ? this.sourceCurrency : '';
    return (value).toString();
  }
  get targetCurrencyFormatted() {
    const value = (this.targetCurrency > 0) ? this.targetCurrency.toFixed(4) : '';
    return (value).toString();
  }
}
