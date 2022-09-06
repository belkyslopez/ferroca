import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoLibrary } from "@awesome-cordova-plugins/photo-library/ngx";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    Camera,
    File,
    FormBuilder,
    PhotoLibrary,
    {  provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
