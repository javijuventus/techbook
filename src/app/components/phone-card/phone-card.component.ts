import { Component, OnInit, Input } from '@angular/core';
import { Phone } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone-card',
  templateUrl: './phone-card.component.html',
  styleUrls: ['./phone-card.component.scss'],
})
export class PhoneCardComponent implements OnInit {

  @Input() phone: Phone;

  rate = 3;
  @Input() catSel: string;

  categoriaSelec: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.categoriaSelec = this.catSel;
  }

  onRateChange(event) {
    console.log(event);
  }

  async verDetalle(phone: Phone) {

    this.router.navigate(['/detail-phone', { phone }]);

  }
}
