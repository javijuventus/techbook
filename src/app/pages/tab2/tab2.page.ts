import { Component, OnInit } from '@angular/core';
import { Phone, RespuestaMovil } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { PhonesService } from '../../services/phones.service';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';

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
              private modalCtrl: ModalController) { }
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

  async verDetalle(phone: Phone) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        phone
      }
    });

    modal.present();
  }

  cargarTodos() {
    this.phonesService.getAllPhones().subscribe(resp => {
      this.phonesBuscar.push(...resp.phones);
      console.log(this.phonesBuscar);
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
