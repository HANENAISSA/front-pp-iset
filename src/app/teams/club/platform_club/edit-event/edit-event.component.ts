import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  idevent: any;
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
  constructor(private http: EventService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.idevent= this.route.snapshot.paramMap.get('id');
    
  }
 
  updateEvent() {
    const formData = new FormData();
    formData.append('titre_event', this.titre_event);
    formData.append('description', this.description);
    formData.append('date_debut', this.date_debut);
    formData.append('date_fin', this.date_fin);
    formData.append('heure_debut', this.heure_debut);
    formData.append('heure_fin', this.heure_fin);
    formData.append('statut', this.statut);
    formData.append('file', this.url_image);
    formData.append('url_event', this.url_event);
    formData.append('id_membre', this.id_membre);
      
    this.http.updateEvent(formData)
    .subscribe(data => {

      if(data['error']!=true){

       /* const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'votre profile a été modifier avec succès';
        modalRef.componentInstance.message = 'Succès';
       */
         }else{
        
     /*   const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = data['message'];
        modalRef.componentInstance.message = 'Erreur';*/
      }
    },
      err => {
   
     console.log(err);
      }
    );
  }
  imageProfil(e:any){
    this.file=e.target.files[0];
    console.log(e.target.files[0])
    }

  /* updatePic(e:any){
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
