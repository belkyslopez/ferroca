import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private alertController: AlertController) { }

  /*
  async presentAlertRegistro() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            if ()
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }*/
}
