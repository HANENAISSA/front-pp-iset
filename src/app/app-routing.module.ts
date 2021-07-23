//main
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DashboardDefaultComponent } from "./pages/dashboard/dashboard-default/dashboard-default.component";
import { SimplePageComponent } from "./pages/simple-page/simple-page.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";


//club-components
import { AccueilGeneralComponent } from "./teams/club/general/accueil-general/accueil-general.component";
import { ClubsComponent } from "./teams/club/general/clubs/clubs.component";
import { DashboardAccueilComponent } from "./teams/club/general/dashboard-accueil/dashboard-accueil.component";
import { EnvoyerDemandeComponent } from "./teams/club/general/envoyer-demande/envoyer-demande.component";
import { EventsComponent } from "./teams/club/general/events/events.component";
import { ListeClubsComponent } from "./teams/club/general/liste-clubs/liste-clubs.component";
import { ResetPasswordComponent } from "./teams/club/general/reset-password/reset-password.component";
import { SendRequestComponent } from "./teams/club/general/send-request/send-request.component";
import { SigninComponent } from "./teams/club/general/signin/signin.component";
import { AccueilClubComponent } from "./teams/club/platform_club/accueil-club/accueil-club.component";
import { DashboardClubComponent } from "./teams/club/platform_club/dashboard-club/dashboard-club.component";
import { ListeDemandesComponent } from "./teams/club/platform_club/liste-demandes/liste-demandes.component";
import { ListeParticipationComponent } from "./teams/club/platform_club/liste-participation/liste-participation.component";
import { MembresComponent } from "./teams/club/platform_club/membres/membres.component";
import { ProfileMembreComponent } from "./teams/club/platform_club/profile-membre/profile-membre.component";
import { TestaccueilComponent } from "./teams/club/platform_club/testaccueil/testaccueil.component";
//administration-components
//communication-components
//scolarite-components
//stagepfe-components
const routes: Routes = [
 //main-routes
  {
    path: "",
    component: HomePageComponent,
    children: [
      {
        path: "",
        component: DashboardDefaultComponent,
      },
    ],
  },

  {
    path: "dashboard",
    component: HomePageComponent,
    children: [
      {
        path: "",
        component: DashboardDefaultComponent,
      },

      {
        path: "profil",
        component: ProfileComponent,
      },
      { path: "simple", component: SimplePageComponent },


      // {
      //   path: "stage", component : ,
      //   children: [
      //     {

      //     }
      //   ]
      // },

      // {
      //   path: "communication", component: ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
      // {
      //   path: "scolarite", component: ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
      // {
      //   path: "selection", component: ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
    ],
  },

//club-routes
{ path: "test", component: TestaccueilComponent },
{ path: "club/events", component: EventsComponent },
{ path: "club/signin", component: SigninComponent },
{ path: "club/reset_password", component: ResetPasswordComponent },
{ path: "accueil/clubs", component: ClubsComponent },
//{ path: "accueil/service_en_ligne/clubs/events", component: ListEventsComponent },
{ path: "clubs/envoyer_demande/:id", component: EnvoyerDemandeComponent },
{
  path: "dashboard_accueil",
  component: DashboardAccueilComponent,
  children: [
    {
      path: "accueil",
      component: AccueilGeneralComponent,
    },
    {
      path: "clubs",
      component: ListeClubsComponent,
    },
    {
      path: "demande/:id",
      component: SendRequestComponent,
    },

  ],
},

{
  path: "dashboard_club",
  component: DashboardClubComponent,
  children: [
    {
      path: "accueil/:id",
      component: AccueilClubComponent,
    },
    /*{
     path: "accueil",
      component: *//*AccueilClubComponent,*/
    //},
    {
      path: "membres/:id",
      component: MembresComponent,
    },
    {
      path: "profile/:id",
      component: ProfileMembreComponent,
    },
    {
      path: "liste-demandes/:id",
      component: ListeDemandesComponent,
    },
    {
      path: "liste-participants/:id",
      component: ListeParticipationComponent
    },
    {
      path: "accueil",
      component: TestaccueilComponent,
    }
  ],
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
