 //imports
import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatRadioModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
//import { ModalModule } from 'ngx-bootstrap/modal';
//main-components
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { SharedModule} from './shared/shared.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardDefaultComponent } from './pages/dashboard/dashboard-default/dashboard-default.component';
import { SimplePageComponent } from './pages/simple-page/simple-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { PopupComponent } from './popup/popup.component';
//club-components

import { AccueilGeneralComponent } from './teams/club/general/accueil-general/accueil-general.component';
import { ListeClubsComponent } from './teams/club/general/liste-clubs/liste-clubs.component';
import { DashboardAccueilComponent } from './teams/club/general/dashboard-accueil/dashboard-accueil.component';
import { DashboardClubComponent } from './teams/club/platform_club/dashboard-club/dashboard-club.component';
import { AccueilClubComponent } from './teams/club/platform_club/accueil-club/accueil-club.component';
import { MembresComponent } from './teams/club/platform_club/membres/membres.component';
import { ListeDemandesComponent } from './teams/club/platform_club/liste-demandes/liste-demandes.component';
import { SigninComponent } from './teams/club/general/signin/signin.component';
import { EnvoyerDemandeComponent } from './teams/club/general/envoyer-demande/envoyer-demande.component';
import { ProfileMembreComponent } from './teams/club/platform_club/profile-membre/profile-membre.component';
import { ResetPasswordComponent } from './teams/club/general/reset-password/reset-password.component';
import { ClubsComponent } from './teams/club/general/clubs/clubs.component';
import { SendRequestComponent } from './teams/club/general/send-request/send-request.component';
import { CommentaireComponent } from './teams/club/platform_club/commentaire/commentaire.component';
import { VotesComponent } from './teams/club/platform_club/votes/votes.component';
import { TestaccueilComponent } from './teams/club/platform_club/testaccueil/testaccueil.component';
import { SearchPipe } from './teams/club/platform_club/liste-demandes/search.pipe';
import { EventsComponent } from './teams/club/general/events/events.component';
import { AddTOcalendrierComponent } from './teams/club/platform_club/add-tocalendrier/add-tocalendrier.component';
import { HeaderComponent } from './teams/club/general/header/header.component';
import { ListParticipesComponent } from './teams/club/platform_club/list-participes/list-participes.component';

//administration-components
//communication-components
//scolarite-components
//stagepfe-components
@NgModule({
  declarations: [
    //main-components
    AppComponent,
    AdminComponent,
    DashboardDefaultComponent,
    SimplePageComponent,
    HomePageComponent,
    ProfileComponent,
    PopupComponent,


    //club-components
    AccueilGeneralComponent,
    ListeClubsComponent,
    DashboardAccueilComponent,
    DashboardClubComponent,
    AccueilClubComponent,
    MembresComponent,
    ListeDemandesComponent,
    SigninComponent,
    EnvoyerDemandeComponent,
    ProfileMembreComponent,
    ResetPasswordComponent,
    ClubsComponent,
    SendRequestComponent,
    CommentaireComponent,
    VotesComponent,
    TestaccueilComponent,
    SearchPipe,
    EventsComponent,
    AddTOcalendrierComponent,
    HeaderComponent,
    ListParticipesComponent,

    //administration-components
    //communication-components
    //scolarite-components
    //stagepfe-components

  ],
  imports: [
   // ModalModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule

  ],
  entryComponents: [PopupComponent],
  schemas: [ NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
