import { Component, Input, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { ClubService } from '../../services/club.service';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MembreService } from '../../services/membre.service';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { PopupComponent } from '../../../../popup/popup.component';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './testaccueil.component.html',
  styleUrls: ['./testaccueil.component.scss']
})
export class TestaccueilComponent implements OnInit {
  clubs: any = [];
  user: any= [];
     //local storage items
     idmembre:any;
     prenom: string;
     nom: string;
     events: any = [];
     role: string;
  constructor(private modalService: NgbModal,private http: EventService,private  _http:ClubService,private  u_http:MembreService,private  router: Router) {}
  ngOnInit() {
    this.getuserClubs();
    this.idmembre=localStorage.getItem('id_membre') ;
    this.nom=localStorage.getItem('nom');
    this.prenom=localStorage.getItem('prenom');

    this.role=localStorage.getItem('role');

    this.getuser(this.idmembre);
    this.getevents();
  }
  getuserClubs() {
    this._http.getuserClubs().subscribe(club => {
      this.clubs= club['data'];
      console.log(club);
    },
    error => {
      console.log(error);
    });
  }
  gotoAccueil(idclub:any){

    this.router.navigate(['/dashboard_club/profile/'+idclub]);
  }
  getuser(id_membre:any) {
    this.u_http.getUser(id_membre)
      .subscribe(
        club => {
          this.user= club['data'];

        },
        error => {
          console.log(error);
        });
  }
  profil(e:any){
    this.router.navigate(['/dashboard_club/profile/'+e]);

  }
  getevents() {
    this.http.getevents()
      .subscribe(
        club => {
          this.events= club['data'];

          console.log(club);
        },
        error => {
          console.log(error);
        });
  }
  participer(id_event:any){
    this.http.participer(id_event).subscribe(data => {
      if(data['error']!=true){
        const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'vous avez participé avec succès';
        modalRef.componentInstance.message = 'Succès';
         }else{
          const modalRef = this.modalService.open(PopupComponent);
          modalRef.componentInstance.name = data['message'];
          modalRef.componentInstance.message = 'Erreur';
      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );
  }
  
}
