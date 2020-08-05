import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  // agregamos PeliculaDetalle a un objeto vacio para evitar un error porque no haya 
  // cargado aun el objeto desde el servicio
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  }

  constructor( private moviesService: MoviesService, 
                private modalCtrl: ModalController,
                private dataLocal: DataLocalService) { }

  async ngOnInit() {
    //console.log('ID', this.id );

    // comprobamos si la pelicula existe o no en favoritos
    const existe = await this.dataLocal.existePelicula( this.id);
    console.log('Detalle component existe: ', existe);
    if (existe){
      this.estrella = 'star'
    }else
    {
      this.estrella = 'star-outline'
    }

    this.moviesService.getPeliculaDetalle( this.id )
        .subscribe( resp => {
          console.log( 'getPeliculaDetalle', resp );
          this.pelicula = resp;
        });

    this.moviesService.getActoresPelicula( this.id )
    .subscribe( resp => {
      console.log( 'geetActoresPelicula', resp );
      this.actores = resp.cast;
    });
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
