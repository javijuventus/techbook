import { Component, OnInit, Input } from '@angular/core';
import { Phone } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-phone',
  templateUrl: './detail-phone.page.html',
  styleUrls: ['./detail-phone.page.scss'],
})
export class DetailPhonePage implements OnInit {

  @Input() phone;

  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor( private router: Router ) { }

  ngOnInit() {
    console.log('Estoy en page detalle');
  }

  regresar() {
    this.router.navigate(['']);
  }

}
