import { Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( private alertController: AlertController,
               private navCtr:NavController) { }

  handlerMessage = '';
  roleMessage = '';
  
  async presentAlertRegistro(header: string, message: string, route = '', actionButton = 'ok', cancelButton = '') {
      const buttons = [
        {
          text: actionButton,
          role: 'confirm',
          handler: () => {
            if (route){
              this.navCtr.navigateBack([route]);
            }
            else{
              console.log("confirm cancel");
            }
          }
        }
      ];
      if (cancelButton) {
        buttons.unshift({
          text: cancelButton,
          role: 'cancel',
          handler: () => {
            console.log('confirm cancel');
          }
        })
      }
      const alert = await this.alertController.create({
        header,
        message,
        buttons
      }); 
    await alert.present();
  }

/*  async deleteConfirm(header: string, message: string, route = '', actionButton = 'ok', cancelButton = '') {
    const buttons: [
        {
          text: actionButton,
          role: 'confirm',
          handler: () => {
            this.deleteProduct(id);
            //console.log('Confirm Okay');
          },
        }
      ];
        if (cancelButton) {
          buttons.unshift({
            text: cancelButton,
            role: 'cancel',
            handler: () => {
              console.log('confirm cancel');
            }
          })
        }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      message,
      buttons
    }); 
    await alert.present();
  }*/

}
