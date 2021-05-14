import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DashboardDefaultComponent } from "./pages/dashboard/dashboard-default/dashboard-default.component";
import { SimplePageComponent } from "./pages/simple-page/simple-page.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";
import { NewDocumentComponent } from "./teams/scolarite/Student-dashboard/new-document/new-document.component";
import { StudentDocumentsListComponent } from "./teams/scolarite/Student-dashboard/student-documents-list/student-documents-list.component";

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
      {
        path: "new-document",
        component: NewDocumentComponent
      },
      {
        path: "documents-list",
        component: StudentDocumentsListComponent
      },

      // {
      //   path: "stage", component : ,
      //   children: [
      //     {

      //     }
      //   ]
      // },
      // {
      //   path: "club", component: ,
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
