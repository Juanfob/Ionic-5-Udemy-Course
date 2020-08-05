import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  textoBuscar = '';
  peliculasNuevas: Pelicula[] = []; 

  constructor( private moviesService: MoviesService)  {}

  buscar( event ){
    const valor = event.detail.value;
    console.log(valor);
    this.moviesService.buscarPeliculas(valor)
          .subscribe( resp => {
            console.log( resp );
          });
  }

  ngOnInit() {
    this.moviesService.getFeature().subscribe( resp => { 
      console.log ('Respuesta ', resp); 
      this.peliculasNuevas = resp.results;
    } );

  }

}
