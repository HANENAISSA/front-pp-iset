
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DashboardDefaultComponent } from "./pages/dashboard/dashboard-default/dashboard-default.component";
import { SimplePageComponent } from "./pages/simple-page/simple-page.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";


//club-components
import { AccueilGeneralComponent } from "./teams/club/general/accueil-general/accueil-general.component";
import { DashboardAccueilComponent } from "./teams/club/general/dashboard-accueil/dashboard-accueil.component";
import { EnvoyerDemandeComponent } from "./teams/club/general/envoyer-demande/envoyer-demande.component";
import { ListeClubsComponent } from "./teams/club/general/liste-clubs/liste-clubs.component";
import { SigninComponent } from "./teams/club/general/signin/signin.component";
import { AccueilClubComponent } from "./teams/club/platform_club/accueil-club/accueil-club.component";
import { DashboardClubComponent } from "./teams/club/platform_club/dashboard-club/dashboard-club.component";
import { ListeDemandesComponent } from "./teams/club/platform_club/liste-demandes/liste-demandes.component";
import { MembresComponent } from "./teams/club/platform_club/membres/membres.component";
import { ProfileMembreComponent } from "./teams/club/platform_club/profile-membre/profile-membre.component";

const routes: Routes = [
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


//club-routes
{ path: "club/signin", component: SigninComponent },
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
      path: "demande",
      component: EnvoyerDemandeComponent,
    },

  ],
},

{
  path: "dashboard_club",
  component: DashboardClubComponent,
  children: [
    {
      path: "accueil",
      component: AccueilClubComponent,
    },
    {
      path: "membres",
      component: MembresComponent,
    },
    {
      path: "profile",
      component: ProfileMembreComponent,
    },
    {
      path: "liste-demandes",
      component: ListeDemandesComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
