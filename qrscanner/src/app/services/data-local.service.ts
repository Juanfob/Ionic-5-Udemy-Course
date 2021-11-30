import { Injectable } from '@angular/core';
import { Registro } from '../pages/models/registro.model';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private router: Router,
    private iab: InAppBrowser
  ) {
    this.recuperarRegistros();
  }

  async guardarRegistro( format: string, text: string) {
    const nuevoRegistro = new Registro( format, text);
    this.guardados.unshift( nuevoRegistro );

    console.log(this.guardados);
    await Storage.set({key: 'registros', value: JSON.stringify(this.guardados)});

    this.abrirRegistro( nuevoRegistro );
  }

  async recuperarRegistros() {
    const saved = await Storage.get({key: 'registros'});
    console.log('Guardados: ', JSON.parse(saved.value));
    this.guardados = JSON.parse(saved.value) || [];
  }

  abrirRegistro( registro: Registro) {
    this.router.navigateByUrl('/tabs/tab2');

    switch(registro.type) {

      case 'http':
        this.iab.create(registro.text, '_system');
      break;

      case 'geo':
        this.router.navigateByUrl(`/tabs/mapa/${registro.text}`);
      break;
    }

  }
}
