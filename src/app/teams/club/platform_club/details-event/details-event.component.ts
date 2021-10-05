import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { EventService } from '../../services/event.service';
//import swal from 'sweetalert';
@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {
  idevent: any;
  event: any = [];
  admin: any;
  constructor(private http: EventService,private route: ActivatedRoute,private router: Router,private _http:ClubService) { }

  ngOnInit() {
    //this.idclub= this.route.snapshot.paramMap.get('id');
    this.idevent= this.route.snapshot.paramMap.get('id');
    this.getOneEvent();
  }
  participer(id_event:any){
    this.http.participer(id_event).subscribe(data => {
      if(data['error']!=true){
       // swal("Succès!", "vous avez participé avec succès", "success");
      }else{
       // swal("Erreur!", data['message'], "error");
      }
    },
      err => {
    console.log(err);
      }
    );
  }
  
  getOneEvent(){
    this.http.getOneEvent(this.idevent).subscribe(club => {
      this.event= club['data'];
      
    },
    error => {
      console.log(error);
    });
  }
  //participer
gotolisteparticipates(id_event:any, nomevent:any ){
  this.router.navigate(['dashboard_club/liste-participes/'+id_event]);
  nomevent = localStorage.setItem('nomevent',nomevent);
  
}
gotoedit(id_event:any){
  this.router.navigate(['dashboard_club/edit/'+id_event]);
  
}
/*
getadmin() {
  this._http.getadmin(this.idclub).subscribe(club => {
    this.admin= club['isAdmin'];



  },
  error => {
    console.log(error);
  });
}*/
}
