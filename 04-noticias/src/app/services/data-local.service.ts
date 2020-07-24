import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  // creamos el array para guardar las noticias seleccionadas como favoritas
  noticias: Article[] = [];

  constructor( private storage: Storage, public toastCtrl: ToastController ) {

    this.cargarFavoritos();

   }


   async presentToast( mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'middle',
      color: 'primary',
      duration: 1500
    });
    toast.present();
  }


  guardarNoticias( noticia: Article){

    // Creamos una validación para no guardar dos veces la misma noticia
    const existe = this.noticias.find( noti => noti.title === noticia.title )

    if ( !existe ) {
      //Guardamos al principio del array
      this.noticias.unshift( noticia );
      //Guardamos en el storage todo el arreglo de noticias
      this.storage.set( 'favoritos', this.noticias );
    }

    this.presentToast( 'Agregado a favorito ');

  }

  // este método lee el storage y si hay información se cargan las noticias en el array
  // usamos aync y await para evitar que se puedan añadir mas favaoritos mientras se cargan
  async cargarFavoritos(){
    // Esto devuelve una promesa
    // si no hay nada en la base de datos regresa "undefined"
    //
    // this.storage.get('favoritos')
    //   .then ( favoritos => {
    //      console.log('Favoritos', favoritos);
    //  });

    const favoritos = await this.storage.get('favoritos');

    // comprobamos si favoritos no es nulo, no está vacio
    if ( favoritos ) {
      this.noticias = favoritos;
    }
    
  }


  borrarNoticia ( noticia: Article) {
    //esto devuelve un array sin el elemento que estamos pasando como noticia
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );

    //y ahora volvemos a guardar en local storage sin el elemento anterior
    this.storage.set('favoritos', this.noticias );

    this.presentToast( 'Eliminado de favorito ');


  }


}
