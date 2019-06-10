import { Component, OnInit } from '@angular/core';
import { PhonesService } from '../../services/phones.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor( private phoneService: PhonesService,
               private usuarioService: UsuarioService ) { }

  ngOnInit() {}

  logout() {
    this.phoneService.paginaPhones = 0;
    this.usuarioService.logout();
  }

}
