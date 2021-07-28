import { Component, Input, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';
import {animate, style, transition, trigger} from '@angular/animations';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddTOcalendrierComponent } from '../add-tocalendrier/add-tocalendrier.component';
import { Subscription } from 'rxjs';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PopupComponent } from '../../../../popup/popup.component';
import { MembreService } from '../../services/membre.service';

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
  fileName:any;
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
  add= true;
  editProfile = true;
  editProfileIcon = 'icofont-ui-add';
  vote: any=[];
  id_event: any;
  message='';
  //CALENDRIER
  tasks: any=[];
  descriptionCal: any;
  temps: any;
  date: any;
  clubss: any=[];

  post_image : any;
  admin: any;
  user: any=[];
  constructor(private u_http:MembreService,private modalService: NgbModal,private route: ActivatedRoute,private router: Router,private e_http: EventService,private v_http:VoteService,private p_http:PostService,private _http:ClubService,private http: HttpClient) {

   }

  ngOnInit() {

    this.nom=localStorage.getItem('nom');
    this.prenom=localStorage.getItem('prenom');
    this.idclub= this.route.snapshot.paramMap.get('id');
    console.log(this.idclub)
    this.id_membre=localStorage.getItem('id_membre');
    this.getposts();
    this.getClubEvents();
    this.getsondage();
    this.getcal(this.idclub);
    this.getuserClubs();
    //console.log("hello")
    this.getadmin();
    //this.getvotes
    this.getuser(this.id_membre);
  }
  /*
participer(id_event:any) { 
  this.e_http.addparticipation(id_event).subscribe(data => {
    if(data['error']!=true){
      const modalRef = this.modalService.open(PopupComponent);
      modalRef.componentInstance.name = 'votre participation a été envoyé';
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
liste(id) { 
  this.router.navigate(['dashboard_club/liste-participants'+ id]);
}*/
  getuserClubs() {
    this._http.getuserClubs().subscribe(club => {
      this.clubss= club['data'];
      for (var club of this.clubss) {
       // console.log(club.id_club);
        //localStorage.setItem("id_club",club.id_club);
      }

      console.log(club);
    },
    error => {
      console.log(error);
    });
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
  getadmin() {
    this._http.getadmin(this.idclub).subscribe(club => {
      this.admin= club['isAdmin'];



    },
    error => {
      console.log(error);
    });
  }
  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }
  open() {
    this.add=!this.add;
    //const modalRef = this.modalService.open(AddTOcalendrierComponent);
    //modalRef.componentInstance.name = 'Hanen';
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
      console.log(this.sondages.id_sondage);
      localStorage.setItem("id_sondage",club['data']['id_sondage']);
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
     console.log(this.votes);

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
        this.message='vous avez votè';
        const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'votre vote a été enregistré avec succès';
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
    console.log(err);
      }
    );
  }

//participer
gotolisteparticipates(id_event:any, nomevent:any ){
  this.router.navigate(['dashboard_club/liste-participes/'+id_event]);
  nomevent = localStorage.setItem('nomevent',nomevent);
  //window.location.href = '/dashboard_club/liste-participes/'+id_event;
}
getallparticipes(id_event:any){
  this.e_http.getallparticipation(id_event).subscribe(club => {
    this.events= club['data'];
    console.log(club);
  },
  error => {
    console.log(error);
  });
}

participer(id_event:any){
  this.e_http.participer(id_event).subscribe(data => {
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
image(e:any){
this.url_image=e.target.files[0];

}
addevent(){
  const formData = new FormData();
  formData.append('titre_event', this.titre_event);
  formData.append('description', this.description);
  formData.append('date_debut', this.date_debut);
  formData.append('date_fin', this.date_fin);
  formData.append('heure_debut', this.heure_debut);
  formData.append('heure_fin', this.heure_fin);
  formData.append('statut', this.statut);
    formData.append('file', this.url_image);
    console.log(this.url_image)
    formData.append('url_event', this.url_event);
    formData.append('id_membre', this.id_membre);
    formData.append('id_club', this.idclub);

  this.e_http.addevent(formData).subscribe(data => {

    if(data['error']!=true){
      //this.description='';
      console.log(data)
      window.alert('votre event a été enregistré avec succès');
      this.editProfile = !this.editProfile;
      this.getClubEvents();
      this.titre_event="";
      this.description="";
      this.date_debut="";
      this.date_fin="";
      this.heure_debut="";
      this.heure_fin="";
      this.statut="";
      this.url_image="";
      this.url_event="";
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

 imagePost(e:any){
  this.post_image=e.target.files[0];
  this.fileName=e.target.files[0].name;
  }
//this.idclub,this.post
 addpost(){
  const formData = new FormData();
  formData.append('description', this.post);
  formData.append('idclub', this.idclub);
  formData.append('file', this.post_image);

  this.p_http.addpost(formData).subscribe(data => {
    if(data['error']!=true){
      this.post='';
      this.post_image='';
      this.getposts();

      this.fileName=""
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




//calendrier
getcal(idclub:any){
  this.e_http.getcalendrier(idclub).subscribe(club => {
    this.tasks= club['data'];
   // console.log(club);
  },
  error => {
    console.log(error);
  });
}
addTOcalendrier(){
  this.e_http.addTOcalendrier(this.idclub,this.temps,this.date,this.descriptionCal).subscribe(data => {
    if(data['error']!=true){
      this.add=!this.add;
      this.getcal(this.idclub);

      console.log(data)
      //localStorage.setItem("sondages",data["sondages"])
       }else{
      //alert(data['message'])
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
//delete . event . post. calendrier . sondage
deletePOST(idpublication:any){
  this.p_http.deletePost(idpublication).subscribe(club => {
    console.log(club);

    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = 'votre publication a été supprimer';
    modalRef.componentInstance.message = 'Supprimer';
    this.getposts();
  },
  error => {
    console.log(error);
  });
}

deleteSONDAGE(idsondage:any){
  this.v_http.deleteSondage(idsondage).subscribe(club => {
    console.log(club);
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = 'votre sondage a été supprimer';
    modalRef.componentInstance.message = 'Supprimer';
    this.getsondage();

  },
  error => {
    console.log(error);
  });
}
deleteEVENT(idevent:any){
  this.e_http.deleteEvent(idevent).subscribe(club => {
    console.log(club);
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = 'votre evenements a été supprimer';
    modalRef.componentInstance.message = 'Supprimer';
    this.getClubEvents();

  },
  error => {
    console.log(error);
  });
}
deleteCAL(idcalendrier:any){
  this.e_http.deleteTask(idcalendrier).subscribe(club => {
    console.log(club);
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = 'vous avez supprimer un evenement de calendrier';
    modalRef.componentInstance.message = 'Supprimer';
    this.getcal(this.idclub);

  },
  error => {
    console.log(error);
  });
}

}


