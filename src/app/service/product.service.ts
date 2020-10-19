import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // creamos la ruta para la carpeta assets donde estara el json
    private RUTA_DATOS = '/product/';

    private headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor( private http: HttpClient) {}


  // metodo para obtener todos los productos de la base de datos
    public getAllProdcudts() {
        return this.http.get(this.RUTA_DATOS);

    }



    // metodo para obtener los productos de un tipo

     public getProductByType(typeInput: string) {


      return this.http.get(this.RUTA_DATOS + 'tipo/' + typeInput);

      // el suscribe lo realizaremos en cada constructor de cada pagina segun la necesitemos
    }

}
