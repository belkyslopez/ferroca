import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from './core/services/authenticate.service';
import { Storage } from '@ionic/storage';
import { TokenService } from './core/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  userName = '';
  isAdmin: boolean = undefined;

  constructor(private menu: MenuController,
    private storage: Storage,
    private navCtrl: NavController,
    private autService: AuthenticateService) { }

  ngOnInit() {
    this.autService.updateUser.subscribe((user: any) => {
      this.userName = user.email;
      this.isAdmin = user.rolName === 'ROL_ADMIN';
      console.log({userName: this.userName, isAdmin: this.isAdmin});
    })
  }

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

  closeMenu() {
    this.menu.close();
  }

  logout() {
    this.closeMenu();
    this.storage.clear();
    this.autService.logout();
    this.navCtrl.navigateRoot('/login', { replaceUrl: true });
  }

}
