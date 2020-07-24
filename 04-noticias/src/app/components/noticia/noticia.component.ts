import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})

export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;


  constructor( private iab: InAppBrowser,
               public actionSheetCtrl:  ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocalService: DataLocalService ) { }

  ngOnInit() {}

  abrirNoticia() {
    //console.log ('Noticia seleccionada ', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lazarMenu() {

    let guardarBorrarBtn;

    if( this.enFavoritos ) {
      // Borrar de favoritos
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito deleted');
          this.dataLocalService.borrarNoticia( this.noticia );
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito clicked');
          this.dataLocalService.guardarNoticias( this.noticia );
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          cssClass: 'action-dark',
          handler: () => {
          console.log('Share clicked');
          this.socialSharing.share( 
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, 
      guardarBorrarBtn,
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
