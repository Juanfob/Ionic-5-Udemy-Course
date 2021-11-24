import { Injectable } from '@angular/core';
import { Registro } from '../pages/models/registro.model';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
  ) {
    this.recuperarRegistros();
  }

  async guardarRegistro( format: string, text: string) {
    const nuevoRegistro = new Registro( format, text);
    this.guardados.unshift( nuevoRegistro );

    console.log(this.guardados);
    await Storage.set({key: 'registros', value: JSON.stringify(this.guardados)});
  }

  async recuperarRegistros() {
    const saved = await Storage.get({key: 'registros'});
    console.log('Guardados: ', saved);

  }
}
