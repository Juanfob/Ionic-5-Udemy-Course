import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { compileNgModule } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  

  peliculas: PeliculaDetalle[] = [];


  constructor( private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }



  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
    });
    toast.present();
  }



  guardarPelicula( pelicula: PeliculaDetalle){

    // Creamos una validación para no guardar dos veces la misma noticia
    const existe = this.peliculas.find( peli => peli.id === pelicula.id )

    let mensaje = '';

    if ( existe ) {
        // esto excluye la pelicua por el id, y devuelve un array excepto la que coincide
      this.peliculas = this.peliculas.filter (peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
      
    }else{
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }


    this.presentToast(mensaje);

    this.storage.set( 'peliculas', this.peliculas );

    return !existe;

  }

  /**
   * Este métodoo debe cargarse lo primero en el constructor, para indicar en el html si hay favoritos o no
   */
  async cargarFavoritos() {
    // si el get no existe regresa un null
    const peliculas = await this.storage.get('peliculas');
    // para evitar ese null, si es asi a this.peliculas le asociamos un array vacio
    this.peliculas = peliculas || [];
    return this.peliculas;
  }


  async existePelicula ( id ){
    //convertimos el tipo id en numero, que es como se graba en la base de datos
   
    await this.cargarFavoritos();
    
    const existe = this.peliculas.find( peli => peli.id === id);

    // utilizamos un operador ternario para decidir si existe o no
    return (existe) ? true: false;
  }

}
