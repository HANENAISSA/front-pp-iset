import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';
import {animate, style, transition, trigger} from '@angular/animations';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-accueil-club',
  templateUrl: './accueil-club.component.html',
  styleUrls: ['./accueil-club.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class AccueilClubComponent implements OnInit {
  post:any;
  cmtre: any;

  posts:any=[];
  cmtrs:any=[];
  sondages:any=[];
  votes:any=[];

  idclub:any;
  title: any;
  nom:any;
  prenom:any;
  idpub: void;
  clubs: any;
  events: any;
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

  editProfile = true;
  editProfileIcon = 'icofont-ui-add';
  vote: any=[];



  constructor(private e_http: EventService,private v_http:VoteService,private p_http:PostService,private _http:ClubService) { }

  ngOnInit() {
    this.nom=localStorage.getItem('nom');
    this.prenom=localStorage.getItem('prenom');
    this.idclub=localStorage.getItem('id_club');
    this.id_membre=localStorage.getItem('id_membre');
    this.getposts();
    this.getClubEvents();
    this.getsondage();


  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }


//post
  getposts() {
    this.p_http.getposts(this.idclub).subscribe(club => {
        this.posts= club['data'];
        console.log(club);
      },
      error => {
        console.log(error);
      });

  }


  addpost(){
    this.p_http.addpost(this.idclub,this.post).subscribe(data => {
      if(data['error']!=true){
        this.post='';
        this.getposts();
        //console.log(data["posts"])
        //localStorage.setItem("posts",data["posts"])
         }else{
        alert(data['message'])
      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );
  }


  //commantaire
  getcmtre(idpublication:any) {
    this.p_http.getComments(idpublication).subscribe(club => {
        this.cmtrs= club['data'];
       // console.log(club);
      },
      error => {
        console.log(error);
      });

  }

  addcmtre(idpublication:any){
    this.p_http.addComment(idpublication,this.cmtre).subscribe(data => {
      if(data['error']!=true){
       this.cmtre='';
        window.location.reload();
        //localStorage.setItem("cmtres",data["cmtres"])
       // console.log(data["cmtres"])
         }else{
        alert(data['message'])
      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );
  }


  //sondage
  getsondage(){
    this.v_http.getsondage(this.idclub).subscribe(club => {
      this.sondages= club['data'];
      //console.log(this.sondages);
    },
    error => {
      console.log(error);
    });
  }

  addsondage(){
    this.v_http.addsondage(this.title,this.idclub).subscribe(data => {
      if(data['error']!=true){
        this.title='';
        this.getsondage();

        //console.log(data["sondages"])
        //localStorage.setItem("sondages",data["sondages"])
         }else{
        alert(data['message'])
      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );
  }


  //vote
  getvotes(idsondage:any){
    this.v_http.getVotes(idsondage).subscribe(club => {
      this.votes= club['data'];
     // console.log(club);
    },
    error => {
      console.log(error);
    });
  }
  getvote(statut:any){
    this.v_http.getVote(statut).subscribe(club => {
      this.vote= club['data'];

     console.log(club);
    },
    error => {
      console.log(error);
    });
  }
  voter(satut:any,idsondage:any){
    this.v_http.addVote(satut,idsondage).subscribe(data => {
      //console.log(idsondage)
      if(data['error']!=true){
        //console.log(idsondage)
        //localStorage.setItem("votes",data["votes"])
        window.alert('votre vote a été enregistré avec succès');
      }else{
        alert(data['message'])

      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );
  }


//events
getClubEvents(){
  this.e_http.getClubEvents(this.idclub).subscribe(club => {
    this.events= club['data'];
    console.log(club);
  },
  error => {
    console.log(error);
  });
}
//description	date_debut	date_fin	heure_debut	heure_fin	statut
  //	url_image	url_event	id_membre	id_club

addevent(){
  this.e_http.addevent(this.titre_event,this.description,this.date_debut, this.date_fin,this.heure_debut,this.heure_fin,
    this.statut,this.url_image,this.url_event,this.id_membre,this.idclub).subscribe(data => {
    if(data['error']!=true){
      //this.description='';
      //this.getClubEvents();
console.log(data)
      window.alert('votre event a été enregistré avec succès');

       }else{
      alert(data['message'])
    }
  },
    err => {
  //show error toast when the server went wrong
  console.log(err);
    }
  );
}
}
