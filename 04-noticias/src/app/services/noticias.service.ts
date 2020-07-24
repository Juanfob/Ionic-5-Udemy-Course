import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

// Enviamos al api la key, mediante headers
const headers = new HttpHeaders({
  'X-Api-Key': apiKey,
});

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  // Inicializamos el contador de array de items
  headlinesPage = 0;

  // Inicializamos para el infinite-scroll por categorías
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) { }

  // Creamos una función para reulitizar peticiones
  private ejecutarQuery<T>( query: string ) {
    query = apiUrl + query    
    return this.http.get<T>( query, {headers} );
  }


  getTopHeadLines() {
    this.headlinesPage ++;
    //return this.http.get<RespuestaTopHeadlines>('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f9825eb24fab4299b6d79353bcdae924');
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${( this.headlinesPage )}`);
  }


  getTopHeadLinesCategoria( categoria: string) {

    // Si la categoria que vamos a consultar es igual a la actual, cargamos más datos
    if (this.categoriaActual === categoria ){
      this.categoriaPage ++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    //return this.http.get('https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=f9825eb24fab4299b6d79353bcdae924');
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }&page=${ this.categoriaPage }`);
  }

}
