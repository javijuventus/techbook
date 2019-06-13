import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  formSignin: FormGroup;
  formSignup: FormGroup;

  public submitAttempt = false;

  loginUser = {
    email: 'javier@techbook.com',
    password: '123456'
  };

  registerUser: Usuario = {
    email: '@techbook.com',
    password: '123456',
    nombre: '',
  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService,
              public formBuilder: FormBuilder) {

    this.formSignin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.formSignup = formBuilder.group({
      nombre: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.slides.lockSwipes(true);
  }

  async login() {

    if (this.formSignin.valid) {
      const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

      if (valido) {
        this.submitAttempt = true;
        this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
        this.uiService.presentToast('Login Correcto. Bienvenido');
      } else {
        this.uiService.alertaInformativa('Usuario y contraseña no son correctos');
      }
    }

  }

  async registro() {

    if (this.formSignup.valid) {

      const lowerEmail = this.registerUser.email.toLowerCase();
      this.registerUser.email = lowerEmail;
      const valido = await this.usuarioService.registro(this.registerUser);

      if (valido) {
        this.submitAttempt = true;
        this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
      } else {
        this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
      }
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
