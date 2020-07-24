import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {  


  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit () {
    this.cargarNoticias();
  }


  loadData( event ){
    // mandamos el evento del infinite-scroll al método cargarNoticias()
    this.cargarNoticias( event );
  }


  // enviamos el evento con ? para hacerlo opcional
  cargarNoticias( event? ) {
           
    // Cargamos las noticias
    this.noticiasService.getTopHeadLines()
      .subscribe( resp  => {
        //console.log('Noticias', resp);
        
        // comprobamos si ya no hay datos y cancelamos el infinite-scroll
        if ( resp.articles.length === 0 ){
          event.target.disabled = true;
          event.target.complete();  
          return;
        } 


        // De esta manera sobreescribimos el Array
        //this.noticias = resp.articles; 
        
        // De esta otra manera añadimos al Array pero usamos el Spread Operator de TypeScript para añadir
        // asi insertamos de manera indepèndiente cada articulo de noticia
        this.noticias.push( ...resp.articles);

        if (event ) {
          event.target.complete();
        }

      });
  }

}
