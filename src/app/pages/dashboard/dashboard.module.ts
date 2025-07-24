import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { PartnersComponent } from './feature/partners/partners.component';
import { SessionsComponent } from './feature/sessions/sessions.component';
import { SpeakersComponent } from './feature/speakers/speakers.component';
import { SettingsComponent } from './feature/settings/settings.component';
import { HomeComponent } from './feature/home/home.component';
import { UsersComponent } from './feature/users/users.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardComponent, children: [
        { path: '', component: HomeComponent },
        { path: 'partners', component: PartnersComponent },
        { path: 'talks', component: SessionsComponent },
        { path: 'speakers', component: SpeakersComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'users', component: UsersComponent }
      ] }
    ])
  ]
})
export class DashboardModule { }
