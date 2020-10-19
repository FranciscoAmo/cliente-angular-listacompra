import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // creamos la ruta para la carpeta assets donde estara el json
    private RUTA_DATOS = '/login/';

    private headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor( private http: HttpClient) {}
    // metodo para obtener los datos de la direccion

     public getData() {

      return this.http.get(this.RUTA_DATOS);

      // el suscribe lo realizaremos en cada constructor de cada pagina segun la necesitemos
    }
    // metodo para registrarse
    public createUser(user: any): Observable<any> {
      return this.http.post(this.RUTA_DATOS + 'signup', user);
    }
    // metodo para logearse
    public loginUser(user: any): Observable<any> {
        return this.http.post(this.RUTA_DATOS + 'signin', user);
      }

}
