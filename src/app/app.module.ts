import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {TransporterListComponent} from './transporters/transporter-list/transporter-list.component';
import {TransporterEditComponent} from './transporters/transporter-edit/transporter-edit.component';
import {TransporterViewComponent} from './transporters/transporter-view/transporter-view.component';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransporterListComponent,
    TransporterEditComponent,
    TransporterViewComponent,
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    NgBootstrapFormValidationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
