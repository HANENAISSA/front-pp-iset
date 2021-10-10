import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../../popup/popup.component';
import swal from 'sweetalert';
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
  confirme: any;
  nomevent: string;
  nombreofparticipation: any;
  constructor(private modalService: NgbModal,private route: ActivatedRoute,private router: Router,private e_http: EventService) { }

  ngOnInit() {
    this.nomevent=localStorage.getItem('nomevent');
    console.log(this.nomevent)
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
    this.nombreofparticipation=club['nombreofparticipation'];
    console.log(this.participants);
  },
  error => {
    console.log(error);
  });
}

confirmer(id_participation:any,event_name:any,email:any){
  //console.log("h")
   this.e_http.confirmer(id_participation,event_name,email).subscribe(data => {

    if(data['error']!=true){

     
      swal("Succès!", "le demande a été confirmé", "success");
      this.getallparticipes();
    }else{
      swal("Erreur!", data['message'], "error");
    }

  },
    err => {
  //show error toast when the server went wrong
    }
  );

}

delete(id_participation:any){
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
      
      this.e_http.deleteparticipant(id_participation).subscribe(data => {

        
        if(data['error']!=true){
    
          this.getallparticipes();
         
        }else{
          swal("Erreur!", data['message'], "error");
        }
    
      },
        err => {
        }
      );
      swal("le demande de participation a été supprimer!", {
        icon: "success",
      });
    } else {
      swal("Votre fichier est en sécurité !");
    }
  });

  

}

}
