import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModule } from '../login.module';
import { LoginService } from '../../service/user.service';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css'],
  animations: [
    trigger(
      'myAnimation',
      [
        state('true', style({ opacity: 1 })),
        state('false', style({ opacity: 0.3 })),
        transition('1 => 0', animate('900ms', style({ opacity: 0.3 }))),
        transition('0 => 1', animate('900ms', style({ opacity: 1 })))
      ])
  ]
})
export class LoginCardComponent implements OnInit {

  loginlogup = false;
  logtext = " LogUp";


  backgrounds = [
    { main: 'https://drive.google.com/uc?id=1wsk0lus_UmgB1x7YBHZ30PHhd59oI_QJ', blur: 'https://drive.google.com/uc?id=13sGmUKF193j2BDrvOtAuGMV27mEe5HSE' },
    { main: 'https://drive.google.com/uc?id=1hSNFcWC5LECKPbws1cMJfcmVGiXPe40v', blur: 'https://drive.google.com/uc?id=1uf_L2Ms1uGLXMgN5WCrUj0zTVdxN-g2p' },
    { main: 'https://drive.google.com/uc?id=13XuzG26KujCSlAqGwAnXMtjNqx5mxYFA', blur: 'https://drive.google.com/uc?id=13nbhGXFU0icwZ1llfTDAFap0r36SbRXX' }
  ];
  backgroundIndex = Math.floor(Math.random() * this.backgrounds.length) + 0;
  secondsToChange = 50;
  pause = false;
  activeBackgroundImage = '';
  showBackgroundImage = false;
  user = '';
  password = '';
  loginGroup: FormGroup;
  loginGroup1: FormGroup;

  constructor(
    private _router : Router,
    private login: LoginService,
    private listservice: ListService
  ) {
    this.activeBackground(false);
    setInterval(() => { this._onChangeBackground(); }, 600 * this.secondsToChange);
  }

  ngOnInit() {
    this.loginGroup = new FormGroup({

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
    this.loginGroup1 = new FormGroup({
      displayName: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  public loginSubmit(loginGroup: FormGroup) {
    console.log(this.loginGroup.value, this.loginGroup.valid);
    // si el formulario es valido continuo
    if (loginGroup.valid) {
      // ahora miro si estoy registrandome o logeandome(loginlogup==false)
        if (!this.loginlogup) {

          // logeandome
          // obtengo los valores del formulario
            this.login.loginUser({

              email: this.loginGroup.get('email').value,
              password : this.loginGroup.get('password').value

          }).subscribe( (datos1: any[]) => {
            // si todo esta correcto el token de vuelta lo guardo en la memoria del navegador
             // console.log(datos1['token']);
              this.listservice.savetoken(datos1['token']);
              localStorage.setItem('displayName', datos1['user']);
              this._router.navigate([`/main/main`]);
             // console.log(datos1['token']);
              // this.token = localStorage.getItem('token');
              // console.log(token);

          }, (err) => {
            // obtengo el valor del mensage de error y lo muestro en una alerta
              console.log(err);
              alert(err.error.message);
              // alert('error en el registro!');
          }
          );

        } else {
          // registrandome

 // si se realiza correctamente se muestra un mensaje y se registra
              // nos subcribimos para obtener el token de autentificacion del usuario

              this.login.createUser({

                email: this.loginGroup1.get('email').value,
                displayName : this.loginGroup1.get('displayName').value,
                password : this.loginGroup1.get('password').value

            }).subscribe( (datos1: any[]) => {
              // si todo esta correcto el token de vuelta lo guardo en las cookies
                console.log(datos1);
                alert(datos1[ 'message' ]);


                this.loginlogup =! this.loginlogup;  // cambia a logearse
            }, (err) => {
              // obtengo el valor del mensage de error y lo muestro en una alerta
                 console.log(err.error.message);
                 alert(err.error.message);
                 alert('error en el registro!');
            }
            );


        }


    } else {
    // si no es valido no hago nada

    }
  }

  public activeBackground(withblur) {
    this.showBackgroundImage = false;
    let back = this.backgrounds[this.backgroundIndex].main;
    if (withblur) { back = this.backgrounds[this.backgroundIndex].blur; }
    setTimeout(() => {
      this.activeBackgroundImage = back;
      this.showBackgroundImage = true;
    }, 1000);
  }

  public bluringBackground() {
    this.activeBackground(true);
    this.pause = true;
  }

  public unbluringBackground() {
    this.pause = false;
    this.activeBackground(false);
  }

  private _onChangeBackground() {
    if (!this.pause) {
      this.backgroundIndex++;
      if (this.backgroundIndex >= this.backgrounds.length) {
        this.backgroundIndex = 0;
      }
      this.activeBackground(false);
    }
  }

  public LogIn_LogUp() {
    this.loginlogup = !this.loginlogup;
    console.log(this.loginlogup);
    if (this.loginlogup === false) {
      this.logtext = 'LogUp';
    } else {
      this.logtext = 'LogIn';
    }
  }
}
