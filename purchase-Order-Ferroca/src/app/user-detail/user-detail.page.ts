import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from '../core/config/url.services';
import { UiService } from '../core/services/ui.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {
  
  user: any;
  url: string = URL_SERVICIOS;

  constructor(private userService: UserService,
    private uiService: UiService,) { }

  ngOnInit() {
    this.user = (history.state);
    console.log("ngOnInit user", this.user._id );
  }

}
