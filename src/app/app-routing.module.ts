import { CommuteResolverGuard } from './shared/guards/commute-resolver.guard';
import { MapComponent } from './components/map/map.component';
import { CommuteDetailComponent } from './components/search/commute-detail/commute-detail.component';
import { SessionComponent } from './components/forms/session/session.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/forms/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { CreateCommuteComponent } from './components/forms/create-commute/create-commute.component';
import { ChatroomComponent } from './components/chat/chatroom/chatroom.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SessionComponent },
  { path: 'search', component: MainComponent },
  { path: 'commute/new', component: CreateCommuteComponent },
  { path: 'commute/:commuteId', resolve: { commute: CommuteResolverGuard },  component: CommuteDetailComponent },
  { path: 'map', component: MapComponent },
  { path: 'users/:userId/messages', component: ChatroomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
