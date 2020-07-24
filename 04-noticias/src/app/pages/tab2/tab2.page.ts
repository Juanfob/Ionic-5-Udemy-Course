import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment) segment: IonSegment;

  categorias= ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
  /**
   * Creamos el arreglo de noticias para mostrar en tab2.page.html los encabezados de las noticias
   */
  noticias: Article[] = [];  

  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() { 
    this.cargarNoticias( this.categorias[0] ); 
  }


  ionViewWillEnter (){
    this.segment.value = this.categorias[0];
  }


  cambioCategoria( event ) {

    // vaciamos el array para que muestre las noticias según categoria
    this.noticias = [];

    const valorSegmento = event.detail.value;
    //console.log(valorSegmento);
    //Asi carga todo al final del listado, porque al usar spread en el cargarNoticias, va añadiendo con push()
    this.cargarNoticias( valorSegmento ); 
  }


  cargarNoticias( categoria: string, event? ) {
    this.noticiasService.getTopHeadLinesCategoria ( categoria )
      .subscribe( resp => {
              //console.log (resp);
              // De esta manera sobreescribimos el Array
              //this.noticias = resp.articles; 
        
              // De esta otra manera añadimos al Array pero usamos el Spread Operator de TypeScript para añadir
              // asi insertamos de manera indepèndiente cada articulo de noticia
            this.noticias.push( ...resp.articles );

            // validamos para cancelar el infinite-scroll
            if ( event ){
              event.target.complete();
            }

      })
  }



  loadData( event ){
    this.cargarNoticias( this.segment.value, event );
  }

}
