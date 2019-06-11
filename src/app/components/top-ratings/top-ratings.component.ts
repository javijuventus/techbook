import { Component, OnInit, Input } from '@angular/core';
import { Phone } from '../../interfaces/interfaces';
import { Router, NavigationExtras } from '@angular/router';
import { PhonesService } from '../../services/phones.service';


@Component({
  selector: 'app-top-ratings',
  templateUrl: './top-ratings.component.html',
  styleUrls: ['./top-ratings.component.scss'],
})
export class TopRatingsComponent implements OnInit {

  @Input() phone;
  @Input() segment;

  @Input() categoria: string;

  constructor(private router: Router, private phonesService: PhonesService) { }

  ngOnInit() {}


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


