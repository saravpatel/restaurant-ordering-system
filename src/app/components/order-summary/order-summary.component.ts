import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  orderDetails: any = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderDetails = sessionStorage.getItem('order');
    if (!this.orderDetails) {
      this.router.navigateByUrl('');
      return;
    }
    sessionStorage.removeItem('order');
    this.orderDetails = JSON.parse(this.orderDetails);
    console.log(this.orderDetails);
  }

}
