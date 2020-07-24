import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  // creamos el array para guardar las noticias seleccionadas como favoritas
  noticias: Article[] = [];

  constructor( private storage: Storage ) { }


  guardarNoticias( noticia: Article){

    // Creamos una validación para no guardar dos veces la misma noticia
    const existe = this.noticias.find( noti => noti.title === noticia.title )

    if ( !existe) {
      //Guardamos al principio del array
      this.noticias.unshift( noticia );
      //Guardamos en el storage todo el arreglo de noticias
      this.storage.set( 'favoritos', this.noticias );
    }

  }

  // este método lee el storage y si hay información se cargan las noticias en el array
  cargarFavoritos(){

  }


}
