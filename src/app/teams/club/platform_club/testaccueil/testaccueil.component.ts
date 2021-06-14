import { Component, Input, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { ClubService } from '../../services/club.service';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MembreService } from '../../services/membre.service';
import { Router } from '@angular/router';



@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './testaccueil.component.html'
})
export class TestaccueilComponent implements OnInit {
  clubs: any = [];
  user: any= [];
     //local storage items
     idmembre:any;
     prenom: string;
     nom: string;
     role: string;
  constructor(private  _http:ClubService,private  u_http:MembreService,private  router: Router) {}
  ngOnInit() {
    this.getuserClubs();
    this.idmembre=localStorage.getItem('id_membre') ;
    this.nom=localStorage.getItem('nom');
    this.prenom=localStorage.getItem('prenom');

    this.role=localStorage.getItem('role');

    this.getuser(this.idmembre);
  }
  getuserClubs() {
    this._http.getuserClubs().subscribe(club => {
      this.clubs= club['data'];
      for (var club of this.clubs) {
       // console.log(club.id_club);
        //localStorage.setItem("id_club",club.id_club);
      }

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
}
