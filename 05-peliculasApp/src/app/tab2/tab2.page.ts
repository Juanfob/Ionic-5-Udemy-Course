import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  textoBuscar = '';
  // para mostrar u ocultar el spinner
  buscando = false;
  peliculasNuevas: Pelicula[] = []; 
  peliculasBusqueda: Pelicula[] = [];


  constructor( private moviesService: MoviesService, private modalCtrl: ModalController)  {}

  ngOnInit() {
    this.moviesService.getFeature().subscribe( resp => { 
      console.log ('Respuesta ', resp); 
      this.peliculasNuevas = resp.results;
    } );

  }


  buscar( event ){
    const valor = event.detail.value;  
    this.buscando = true;

    // si no hay valor de búsqueda retornamos en array vacio
    if(valor === ""){
      console.log('no hay seleccion de busqueda');
      this.buscando = false;
      this.peliculasBusqueda = [];
      return;
    }

    this.moviesService.buscarPeliculas(valor)
          .subscribe( resp => {
            console.log( 'busqueda',resp );
            // ponemos entre corchetes results, para no crear la interfaz
            this.peliculasBusqueda = resp['results'];
            this.buscando = false;
          });
  }


  async verDetalle( id: string ){

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id: id
      }
    });

    modal.present();

  }
}
