import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from '../core/config/url.services';
import { Cliente } from '../core/interfaces/interfaces';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  customer: Cliente;
  url: string = URL_SERVICIOS;

  constructor() { }

  ngOnInit() {
    this.customer = (history.state);
    console.log("ngOnInit user", this.customer );
  }

}
