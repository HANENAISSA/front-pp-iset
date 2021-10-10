import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../services/event.service';
import { RequestService } from '../../services/request.service';
import { PopupComponent } from '../../../../popup/popup.component';

@Component({
  selector: 'app-liste-participation',
  templateUrl: './liste-participation.component.html',
  styleUrls: ['./liste-participation.component.scss']
})
export class ListeParticipationComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  query:any;
  idevent: string;
  participants: any;
  nombreofparticipation: any;
  add= true;
  
  constructor(private modalService: NgbModal,private _http:EventService,private route: ActivatedRoute) { }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.refreshData();
  }
  ngOnInit() {
    this.idevent=this.route.snapshot.paramMap.get('id');
    this.get();
  }

  get() {
    this._http.getOneUser().subscribe(club => {
        this.participants=club['data'];
        this.nombreofparticipation=club['nombreofparticipation'];
        console.log(club);
      },
      error => {
        console.log(error);
      });

  }
/*
  Accepter(id_participation:any ){
    //console.log("h")
     this._http.confirmer(id_participation).subscribe(data => {

      console.log(data)
      if(data['error']!=true){

        this.get();
       // window.alert('le demande a été accepté')
       const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'le demande a été confirmé';
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

  Delete(id_participation:any ){
    //console.log("h")
     this._http.delete(id_participation).subscribe(data => {

      console.log(data)
      if(data['error']!=true){

        this.get();
       // window.alert('le demande a été accepté')
       const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'le demande a été suprimé';
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

  }*/
}
