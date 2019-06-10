import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser =  {
    email: 'javier@techbook.com',
    password: '123456'
  };

  registerUser: Usuario = {
    email: '@techbook.com',
    password: '123456',
    nombre: '',
  };

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiServiceService ) { }

  ngOnInit() {

    this.slides.lockSwipes( true );
  }

  async login(fLogin: NgForm) {

    if ( fLogin.invalid ) {
      return;
    }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
      this.uiService.presentToast('Login Correcto. Bienvenido');
    } else {
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos');
    }

  }

  async registro(fRegistro: NgForm) {

    if ( fRegistro.invalid ) { return; }

    const valido = await this.usuarioService.registro( this.registerUser );

    if ( valido ) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
    }
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
  this.slides.lockSwipes(false);
  this.slides.slideTo(1);
  this.slides.lockSwipes(true);
  }



}
