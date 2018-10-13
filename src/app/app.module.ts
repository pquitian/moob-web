import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModule } from 'ng2-semantic-ui';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/common/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SessionComponent } from './components/forms/session/session.component';
import { SignupComponent } from './components/forms/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { SearcherComponent } from './components/search/searcher/searcher.component';
import { SearchListComponent } from './components/search/search-list/search-list.component';
import { CommuteDetailComponent } from './components/search/commute-detail/commute-detail.component';
import { MapComponent } from './components/map/map.component';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { CreateCommuteComponent } from './components/forms/create-commute/create-commute.component';
import { CreateVehicleComponent } from './components/forms/create-vehicle/create-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SessionComponent,
    SignupComponent,
    MainComponent,
    SearcherComponent,
    SearchListComponent,
    CommuteDetailComponent,
    MapComponent,
    CreateCommuteComponent,
    CreateVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SuiModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: `${environment.mapsKey}`,
      libraries: ['places']
    }),
    ReactiveFormsModule,
    AgmDirectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
