import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';



@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode:true,
    spaceBetween: -10
  };


  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClick() {
    //console.log('Cargar más');
    //mandamos al padre tab1 el evento de cargar mas
    this.cargarMas.emit();
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
