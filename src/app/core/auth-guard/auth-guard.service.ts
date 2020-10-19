import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  // si esta autentificacdo no hace nada si no es asi navega a la pantalla de login
  canActivate() {
    if (this.userAuthenticated()) {
      return true;
    }
    this.router.navigate(['/home/login']);
    return false;
  }

  private userAuthenticated(): boolean {
    if(localStorage.getItem('token') != null || localStorage.getItem('token') == undefined){
      return false;
    }
    return true;
  }
}
