import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TransporterListComponent} from './transporters/transporter-list/transporter-list.component';
import {TransporterEditComponent} from './transporters/transporter-edit/transporter-edit.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'transporters', component: TransporterListComponent},
  {path: 'transporters/new', component: TransporterEditComponent},
  {path: 'transporters/edit/:id', component: TransporterEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
