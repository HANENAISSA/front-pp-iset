import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../../popup/popup.component';

@Component({
  selector: 'app-liste-demandes',
  templateUrl: './liste-demandes.component.html',
  styleUrls: ['./liste-demandes.component.scss']
})
export class ListeDemandesComponent implements OnInit {
  requests: any=[];

  //isCollapsedMobile: string;
  //isCollapsedSideBar: string;
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  query:any;

  public searchFilter: any = '';
  equipes: any=[];
  constructor(private modalService: NgbModal,private _http:RequestService,private route: ActivatedRoute)
  {
    //this.isCollapsedMobile = 'no-block';
   //this.isCollapsedSideBar = 'no-block';
}


handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.refreshData();
  }
  /*toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }
  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }*/

  ngOnInit(): void {
    this.getrequests();

  }
  getteams() {
    this._http.getTeams()
      .subscribe(
        club => {
          this.equipes= club['data'];
          console.log(this.equipes)
        },
        error => {
          console.log(error);
        });
  }
  getrequests() {
    this._http.getRequests().subscribe(club => {
        this.requests= club['data'];
        console.log(club);
      },
      error => {
        console.log(error);
      });

  }

  Accepter(id_demande:any, email:any ){
    //console.log("h")
     this._http.acceptRequests(id_demande,email).subscribe(data => {

      console.log(data)
      if(data['error']!=true){

        this.getrequests();
       // window.alert('le demande a été accepté')
       const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'le demande a été accepté';
        modalRef.componentInstance.message = 'Succès';
      }else{
        //alert(data['message'])
        const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = data['message'];
        modalRef.componentInstance.message = 'Erreur';
      }

    },
      err => {
    //show error toast when the server went wrong
      }
    );

  }
  Delete(iddemande:any, email:any ){
    this._http.DeleteRequests(iddemande,email).subscribe(data => {
     console.log(data)
     if(data['error']!=true){
      this.getrequests();
     // window.alert('le demande a été supprimer')
     const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'le demande a été supprimer';
        modalRef.componentInstance.message = 'Succès';
     }else{
      // alert(data['message'])
      const modalRef = this.modalService.open(PopupComponent);
      modalRef.componentInstance.name = data['message'];
      modalRef.componentInstance.message = 'Erreur';
     }

   },
     err => {
   //show error toast when the server went wrong
     }
   );

 }
}
