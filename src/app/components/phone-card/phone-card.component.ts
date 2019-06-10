import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Phone } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-phone-card',
  templateUrl: './phone-card.component.html',
  styleUrls: ['./phone-card.component.scss'],
})
export class PhoneCardComponent implements OnInit {

  @Input() phone;

  @Input() catSel: string;

  constructor(private router: Router) { }

  ngOnInit() {  }

  onRateChange(event) {
  }

   verDetalle(phone: Phone) {
   const navigationExtras: NavigationExtras = {
    state: {
      value: phone
    }
  };
   this.router.navigate(['detail-phone'], navigationExtras);
}

  }
