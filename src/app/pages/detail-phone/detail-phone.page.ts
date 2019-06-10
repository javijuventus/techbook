import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PhonesService } from '../../services/phones.service';
import { Location } from '@angular/common';
import { Phone } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-detail-phone',
  templateUrl: './detail-phone.page.html',
  styleUrls: ['./detail-phone.page.scss'],
})
export class DetailPhonePage implements OnInit {

  data: any;
  phone: Phone;
  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor(private route: ActivatedRoute, private location: Location,
              private router: Router, private phoneService: PhonesService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.value;
        this.phone = this.data;
        console.log('data', this.data);
        console.log('Phone consctructor', this.phone);
      }
    });
  }

  ngOnInit() {

    if (this.phone === undefined) {
      this.phone = this.phoneService.getPhone();
      console.log('Valor del storage', this.phone);
    }
    if (this.phone === undefined) {
      console.log('Saliendo..');
      this.regresar();
    }
  }

  regresar() {
    this.phoneService.eliminarPhoneStorage();
    this.location.back();
  }

}
