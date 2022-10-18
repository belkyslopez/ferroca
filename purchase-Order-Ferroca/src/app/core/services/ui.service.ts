import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private alertController: AlertController, private toastController: ToastController) { }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position
    });
    await toast.present();
  }
}
