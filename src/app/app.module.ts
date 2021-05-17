import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { SharedModule} from './shared/shared.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardDefaultComponent } from './pages/dashboard/dashboard-default/dashboard-default.component';
import { SimplePageComponent } from './pages/simple-page/simple-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { PopupComponent } from './popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewDocumentComponent } from './teams/scolarite/Student-dashboard/new-document/new-document.component';
import { ScolariteComponent } from './teams/scolarite/scolarite/scolarite.component';
import { StudentDocumentsListComponent } from './teams/scolarite/Student-dashboard/student-documents-list/student-documents-list.component';
import { DocumentsListComponent } from './teams/scolarite/admin-dashboard/documents-list/documents-list.component';
import { SearchPipe } from './teams/scolarite/admin-dashboard/documents-list/search.pipe';
import { NewReclamationComponent } from './teams/scolarite/Student-dashboard/new-reclamation/new-reclamation.component';
import { StudentReclamationsListComponent } from './teams/scolarite/Student-dashboard/student-reclamations-list/student-reclamations-list.component';
import { ReclamationsListComponent } from './teams/scolarite/admin-dashboard/reclamations-list/reclamations-list.component';
import { SearchReclamationPipe } from './teams/scolarite/admin-dashboard/reclamations-list/search-reclamation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardDefaultComponent,
    SimplePageComponent,
    HomePageComponent,
    ProfileComponent,
    PopupComponent,
    NewDocumentComponent,
    ScolariteComponent,
    StudentDocumentsListComponent,
    DocumentsListComponent,
    SearchPipe,
    NewReclamationComponent,
    StudentReclamationsListComponent,
    ReclamationsListComponent,
    SearchReclamationPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [PopupComponent],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
