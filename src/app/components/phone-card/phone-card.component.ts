import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Phone } from '../../interfaces/interfaces';
import { Router, NavigationExtras } from '@angular/router';
import { PhonesService } from '../../services/phones.service';

@Component({
  selector: 'app-phone-card',
  templateUrl: './phone-card.component.html',
  styleUrls: ['./phone-card.component.scss'],
})
export class PhoneCardComponent implements OnInit {

  @Input() phone;
  @Input() segment;

  @Input() categoria: string;

  constructor(private router: Router, private phonesService: PhonesService) { }

  ngOnInit() {
    }

   verDetalle(phone: Phone) {
   const navigationExtras: NavigationExtras = {
    state: {
      value: phone
    }
  };
   this.phonesService.guardarPhone(phone);
   this.router.navigate(['detail-phone'], navigationExtras);
}

  }
