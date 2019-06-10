import { Component, OnInit } from '@angular/core';
import { Phone, RespuestaMovil } from '../../interfaces/interfaces';
import { PhonesService } from '../../services/phones.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  filtro = 'marca';

  buscando = false;
  phonesBuscar: Phone[] = [];
  textoBuscar = '';
  ideas: string[] = ['Samsung', 'Xiaomi', 'Iphone'];
  allPhones = [];

  constructor(private phonesService: PhonesService,
              private router: Router) { }
  ngOnInit() { }

  buscar(event) {
    const valor: string = event.detail.value;
    if (valor.length === 0) {
      this.buscando = false;
      this.phonesBuscar = [];
      return;
    }
    this.buscando = true;
    if (this.filtro === 'marca') {
      this.phonesService.buscarPorMarca(valor)
        .then((resp: RespuestaMovil) => {
          this.phonesBuscar = resp.phones;
          this.buscando = false;
        });
    }
    if (this.filtro === 'modelo') {
      this.phonesService.buscarPorModelo(valor)
        .then((resp: RespuestaMovil) => {
          this.phonesBuscar = resp.phones;
          this.buscando = false;
        });
    }
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

  cargarTodos() {
    this.phonesService.getAllPhones().subscribe(resp => {
      this.phonesBuscar.push(...resp.phones);
    });
  }

  cambioFiltro(event) {

    this.filtro = event.detail.value;
    if (this.filtro === 'modelo') {
      this.ideas = ['Mi', 'X', 'Galaxy'];
    }

    if (this.filtro === 'marca') {
      this.ideas = ['Samsung', 'Xiaomi', 'Iphone'];
    }

  }


}
