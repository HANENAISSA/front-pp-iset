import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../../popup/popup.component';

@Component({
  selector: 'app-list-participes',
  templateUrl: './list-participes.component.html',
  styleUrls: ['./list-participes.component.scss']
})
export class ListParticipesComponent implements OnInit {
  participants: any=[];
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  query:any;
  id_event:any;
  constructor(private modalService: NgbModal,private route: ActivatedRoute,private router: Router,private e_http: EventService) { }

  ngOnInit() {
    this.id_event=this.route.snapshot.paramMap.get('id');
    this.getallparticipes();
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.refreshData();
  }
//participer
getallparticipes(){
  this.e_http.getallparticipation(this.id_event).subscribe(club => {
    this.participants= club['data'];
    console.log(club);
  },
  error => {
    console.log(error);
  });
}

confirmer(id_participation:any){
  //console.log("h")
   this.e_http.confirmer(id_participation).subscribe(data => {

    console.log(data)
    if(data['error']!=true){

     
     // window.alert('le demande a été accepté')
     const modalRef = this.modalService.open(PopupComponent);
      modalRef.componentInstance.name = 'le demande a été confirmé';
      modalRef.componentInstance.message = 'Succès';
      this.getallparticipes();
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

delete(id_participation:any){
  //console.log("h")
   this.e_http.deleteparticipant(id_participation).subscribe(data => {

    console.log(data)
    if(data['error']!=true){

      this.getallparticipes();
      const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = 'votre publication a été supprimer';
    modalRef.componentInstance.message = 'Supprimer';
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

}
