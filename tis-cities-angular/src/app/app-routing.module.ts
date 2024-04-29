import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityBrowseComponent } from './city/city-browse/city-browse.component';
import { CountyBrowseComponent } from './county/county-browse/county-browse.component';
import { MajorBrowseComponent } from './major/major-browse/major-browse.component';

const routes: Routes = [
  {
    path: 'majors', component: MajorBrowseComponent
  },
  {
    path: 'cities', component: CityBrowseComponent
  },
  {
    path: 'counties', component: CountyBrowseComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
