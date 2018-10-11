import { MapComponent } from './components/map/map.component';
import { CommuteDetailComponent } from './components/search/commute-detail/commute-detail.component';
import { SessionComponent } from './components/forms/session/session.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/forms/signup/signup.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SessionComponent },
  { path: 'search', component: MainComponent },
  { path: 'commute/:commuteId', component: CommuteDetailComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
