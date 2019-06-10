import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm } from '@angular/forms';
import { PhonesService } from '../../services/phones.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  data: any = {};

  constructor( private usuarioService: UsuarioService,
               private uiService: UiServiceService,
               private phoneService: PhonesService ) {

  }

  ngOnInit() {

    this.data = this.usuarioService.getUsuario();
    this.usuario = this.data.usuario;
    console.log(this.usuario);
  }

  async actualizar( actualizarForm: NgForm ) {

    if ( actualizarForm.invalid ) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario );
    if ( actualizado ) {
      this.uiService.presentToast( ' Registro actualizado');
    } else {
      this.uiService.presentToast( ' No se puedo actualizar');
    }

  }

  logout() {
    this.phoneService.paginaPhones = 0;
    this.usuarioService.logout();
  }

}
