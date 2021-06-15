import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { DashboardDefaultComponent } from "./pages/dashboard/dashboard-default/dashboard-default.component";
import { ProfileComponent } from "./pages/user/profile/profile.component";
import { DocumentsListComponent } from "./teams/scolarite/admin-dashboard/documents-list/documents-list.component";
import { ReclamationDetailComponent } from "./teams/scolarite/admin-dashboard/reclamation-detail/reclamation-detail.component";
import { ReclamationsListComponent } from "./teams/scolarite/admin-dashboard/reclamations-list/reclamations-list.component";
import { NewDocumentComponent } from "./teams/scolarite/Student-dashboard/new-document/new-document.component";
import { NewReclamationComponent } from "./teams/scolarite/Student-dashboard/new-reclamation/new-reclamation.component";
import { StudentDocumentsListComponent } from "./teams/scolarite/Student-dashboard/student-documents-list/student-documents-list.component";
import { StudentReclamationsListComponent } from "./teams/scolarite/Student-dashboard/student-reclamations-list/student-reclamations-list.component";

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
      {
        path: "admin-documents-list",
        component: DocumentsListComponent
      },
      {
        path: "new-reclamation",
        component: NewReclamationComponent
      },
      {
        path: "reclamations-list",
        component: StudentReclamationsListComponent
      },
      {
        path: "admin-reclamations-list",
        component: ReclamationsListComponent
      },
      {
        path: "reclamation-detail/:id",
        component: ReclamationDetailComponent
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
