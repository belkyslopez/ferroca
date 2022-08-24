import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from './core/services/authenticate.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController,
              private storage: Storage,
              private navCtrl: NavController,
              private autService: AuthenticateService ) {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  closeMenu(){
    this.menu.close();
  }
  
  logout(){
    this.closeMenu();
    this.storage.clear();
    this.autService.logout();
    this.navCtrl.navigateRoot('/login', { replaceUrl: true});
  }

}
