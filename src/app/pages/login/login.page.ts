import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../validators/password-validation';
import { EmailValidation } from '../../validators/email-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  formSignin: FormGroup;
  formSignup: FormGroup;

  submitAttempt = false;

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
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.slides.lockSwipes(true);
  }

  createForm() {
    this.formSignin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.formSignup = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      emailConfirm: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, {
        validator: [PasswordValidation.MatchPassword, EmailValidation.MatchEmail]
      }
    );
  }

  get email() {
    return this.formSignup.get('email');
  }
  get emailConfirm() {
    return this.formSignup.get('emailConfirm');
  }
  get nombre() {
    return this.formSignup.get('nombre');
  }
  get password() {
    return this.formSignup.get('password');
  }
  get pwConfirm() {
    return this.formSignup.get('passwordConfirm');
  }

  async login() {
    if (this.formSignin.valid) {
      const loginValid = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
      if (loginValid) {
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
