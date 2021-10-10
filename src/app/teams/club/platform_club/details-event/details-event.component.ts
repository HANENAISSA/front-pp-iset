import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { EventService } from '../../services/event.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {
  idevent: any;
  event: any = [];
  admin: any;
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  idclub: any;
  //event
titre_event: any;
description:any;
date_debut: any;
date_fin: any;
url_image: any;
statut: any;
id_membre: any;
url_event: any;
heure_debut: any;
heure_fin: any;
  file: any;
  constructor(private http: EventService,private route: ActivatedRoute,private router: Router,private _http:ClubService) { }

  ngOnInit() {
    this.idclub= this.route.snapshot.paramMap.get('idc');
    this.idevent= this.route.snapshot.paramMap.get('id');
    this.getOneEvent();
    this.getadmin();
  }
  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }
  getadmin() {
    this._http.getadmin(this.idclub).subscribe(club => {
      this.admin= club['isAdmin'];

    },
    error => {
      console.log(error);
    });
  }
  participer(id_event:any){
    this.http.participer(id_event).subscribe(data => {
      if(data['error']!=true){
        swal("Succès!", "vous avez participé avec succès", "success");
      }else{
       swal("Erreur!", data['message'], "error");
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
/*
gotoedit(id_event:any){
  this.router.navigate(['dashboard_club/edit/'+id_event]);
  
}*/
updateEvent() {

  this.http.updateEvent(this.idevent,this.titre_event,this.description,this.date_debut,this.date_fin,this.heure_debut,this.heure_fin,this.statut,this.url_image)
  .subscribe(data => {

    if(data['error']!=true){
      swal("Succès!", "l'événement a été modifié avec succès", "success");
      this.getOneEvent();
      this.editProfile = !this.editProfile;

       }else{
      swal("Erreur!", data['message'], "error");
    }
  },
    err => {
 
   console.log(err);
    }
  );
}
/* imageProfil(e:any){
  this.file=e.target.files[0];
  console.log(e.target.files[0])
  }

updatePic(e:any){
  const formData = new FormData();

  formData.append('file', e.target.files[0]);
    console.log(this.file)
  this.http.UpdatePic(formData).subscribe(data => {
    if(data['error']!=true){
      this.file='';

     // this.getuser(this.idmembre);
      console.log(data)

       }else{
      alert(data['message'])
    }
  },
    err => {
  //show error toast when the server went wrong
  console.log(err);
    }
  );
}*/

}
