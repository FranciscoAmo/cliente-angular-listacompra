import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class ListService implements OnDestroy {

   // obtengo el token que obtube a logearme
   private token = null;
  // creamos la ruta para la carpeta assets donde estara el json
    private RUTA_DATOS = '/lista/';

    // cabecera de las peticiones de lista
    public headers;


  constructor( private http: HttpClient) {

  }



  ngOnDestroy(): void {


  }

   public loadHeaders() {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization : 'Bearer ' + this.token
    });
   }



    public deletetoken() {
      localStorage.setItem('token', null);
      localStorage.setItem('displayName', null);
      this.token = null;
      this.headers = null;
    }

    public savetoken(token) {
      localStorage.setItem('token', token);
      this.token = token;
      this.headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization : 'Bearer ' + this.token
    });

    }


    // metodo para obtener los datos de las listas

     public getData() {

      return this.http.get(this.RUTA_DATOS, {headers: this.headers});

      // el suscribe lo realizaremos en cada constructor de cada pagina segun la necesitemos
    }

    // metodo para obtener los datos de una lista
    public getOneList(listId: string) {


      return this.http.get(this.RUTA_DATOS  + listId, {headers: this.headers});

      // el suscribe lo realizaremos en cada constructor de cada pagina segun la necesitemos
    }


    // metodo para crear una lista nueva vacia del usuario autentificado
    public createList(nameListinput: string) {
      console.log(this.token);
      console.log(this.headers.get('Authorization'));
      const bodyinput = new HttpParams()
      .set('nameList', nameListinput);


      console.log(nameListinput);

      return this.http.post(this.RUTA_DATOS, bodyinput, {headers: this.headers});
    }

    // elimino al usuario de la lista o la lista si no quedan usuarios
    public removeUserfromList(listId: string) {
      const bodyinput = new HttpParams()
      .set('_id', listId);

      return this.http.put(this.RUTA_DATOS, bodyinput, {headers: this.headers});

    }

    // añado un usuario a la lista
    public addUser(emailUsertoAdd: string, listId: string) {
      const bodyinput = new HttpParams()
      .set('_id', listId);

      return this.http.put(this.RUTA_DATOS + emailUsertoAdd, bodyinput, {headers: this.headers});

    }

    // añado un producto a la lista
    public addProduct(nameProduct: string, quantity: number , listId: string) {
      const bodyinput = new HttpParams()
      .set('_id', listId)
      .set('quantity', quantity.toString());

      return this.http.put(this.RUTA_DATOS +  'name/' + nameProduct + '/add' , bodyinput, {headers: this.headers});
    }

     // elimino un producto a la lista
     public removeProduct(nameProduct: string , listId: string) {
      const bodyinput = new HttpParams()
      .set('_id', listId);


      return this.http.put(this.RUTA_DATOS + 'name/' + nameProduct + '/remove' , bodyinput, {headers: this.headers});
    }


    // actualizo la cantidad del producto
    public updateQuantity(nameProduct: string, listId: string, newQuantity: number) {
      const bodyinput = new HttpParams()
      .set('_id', listId)
      .set('newquantity', newQuantity.toString());

      return this.http.put(this.RUTA_DATOS + 'name/' + nameProduct + '/update', bodyinput, {headers: this.headers});

    }


}
