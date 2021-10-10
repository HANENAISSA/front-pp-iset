import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../../popup/popup.component';
import swal from 'sweetalert';
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
  idclub: string;
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
    this.idclub= this.route.snapshot.paramMap.get('id');
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
    this._http.getRequests(this.idclub).subscribe(club => {
        this.requests= club['data'];
        console.log(club);
      },
      error => {
        console.log(error);
      });

  }

  Accepter(id_demande:any, email:any ){

     this._http.acceptRequests(id_demande,email).subscribe(data => {

      if(data['error']!=true){

        this.getrequests();
        swal("Succès!", "le demande a été accepté", "success");
      }else{
        swal("Erreur!", data['message'], "error");
      }

    },
      err => {
   
      }
    );

  }
  Delete(iddemande:any, email:any ){
    swal({
      title: "Es-tu sûr?",
      text: "Une fois supprimé, vous ne pourrez plus récupérer ce fichier!",
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: true,
      },
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        
        this._http.DeleteRequests(iddemande,email).subscribe(data => {
          console.log(data)
          if(data['error']!=true){
           this.getrequests();
     
          }else{
            swal("Erreur!", data['message'], "error");
          }
     
        },
          err => {
       
          }
        );
        swal("le demande a été supprimer!", {
          icon: "success",
        });
      } else {
        swal("Votre fichier est en sécurité !");
      }
    });
  
  

 }
}
