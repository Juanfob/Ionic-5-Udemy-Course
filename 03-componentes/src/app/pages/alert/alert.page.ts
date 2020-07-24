import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {

  titulo: string;

  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'ok',          
          cssClass: 'primary',
          handler: (blah) => {
            console.log('Confirm Ok: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  async presentInput() {
    const input = await this.alertCtrl.create({
      header: 'Input',
      subHeader: 'Ingrese su nombre',
      inputs: [
        {
          name: 'txtNombre',
          type: 'text',
          placeholder: 'Placeholder titulo'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: ( data ) => {
            console.log('Confirm Ok', data);
            this.titulo = data.txtNombre;
          }
        }
      ]
    });

    await input.present();
  }


}
