import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MajorBrowseComponent } from './major/major-browse/major-browse.component';
import { MajorEditComponent } from './major/major-edit/major-edit.component';
import { CountyBrowseComponent } from './county/county-browse/county-browse.component';
import { CountyEditComponent } from './county/county-edit/county-edit.component';
import { CityBrowseComponent } from './city/city-browse/city-browse.component';
import { CityEditComponent } from './city/city-edit/city-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'; 
import { MatDialogModule } from '@angular/material/dialog';
import { CityService } from './city/city-service/city-service.component';
import { CountyService } from './county/county-service/county-service.component';
import { MajorService } from './major/major-service/major-service.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
 
@NgModule({
  declarations: [
    AppComponent,
    MajorBrowseComponent,
    MajorEditComponent,
    CountyBrowseComponent,
    CountyEditComponent,
    CityBrowseComponent,
    CityEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [
    MajorService,
    CityService,
    CountyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
