import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'c70Ba8L9V7te5LI2TJq2vOQ4D97sEwu2';
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    if(localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query: string){

    // query es el término que escribimos de busqueda?
    query = query.trim().toLowerCase();

    // Si el array _historial no incluye este valor, no lo tiene ya, entonces lo inserta

    if (!this._historial.includes(query)){
      // unshift porque lo quiero insertar al principio, no al final
      this._historial.unshift(query);
      // splice(0,10) porque solo quiero mostrar los 10 últimos elementos de búsqueda
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      //subscribe se ejecuta cuando tengamos el resutlado del get y tendremos una respuesta
      .subscribe( 
        (resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        
      // Guardar en localStorage los resultados
      localStorage.setItem('resultados', JSON.stringify(this.resultados));

        // resp.data[0].images
        }
      );


  }

}
