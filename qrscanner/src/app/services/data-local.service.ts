import { Injectable } from '@angular/core';
import { Registro } from '../pages/models/registro.model';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private router: Router,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
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

  enviarCorreo() {

    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto\n';

    arrTemp.push( titulos );

    this.guardados.forEach( registro => {
      const linea = `${ registro.type}, ${ registro.format }, ${ registro.created }, ${ registro.text.replace(',', '') }\n`;
      arrTemp.push( linea );

    });

    this.crearArchivoFisico( arrTemp.join(''));

  }

  crearArchivoFisico(text: string) {

    this.file.checkFile( this.file.dataDirectory, 'registros.csv' )
      .then( existe => {
        console.log('Existe archivo?: ', existe);
        return this.escribirEnArchivo( text );
      }).catch( err => this.file.createFile( this.file.dataDirectory,'registros.csv', false)
          .then( creado => this.escribirEnArchivo( text )))
          .catch( err2 => console.log('error: ' , err2));

  }

  async escribirEnArchivo( text: string){
    await this.file.writeExistingFile( this.file.dataDirectory, 'registros.csv', text);

    const archivo = this.file.dataDirectory + 'registros.csv';
    //console.log(this.file.dataDirectory + 'registros.csv');

    const email = {
      to: 'juanfob@gmail.com',
      //cc: 'erika@mustermann.de',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'Backup QRScanner',
      body: 'Backup APP QRScanner',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);

  }


}
