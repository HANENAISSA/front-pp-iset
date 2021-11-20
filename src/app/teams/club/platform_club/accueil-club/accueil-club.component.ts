import { Component, Input, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';
import {animate, style, transition, trigger} from '@angular/animations';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MembreService } from '../../services/membre.service';
import { ActivitesService } from '../../services/activites.service';
import swal from 'sweetalert';
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
  //
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
  buttontext: string = "Ajouter Sondage";
  titre: any;
  activites: any;
  titre_act: string | Blob;
  description_act: string | Blob;
  image_act: string | Blob;
  date_act: string | Blob;
  constructor(private a_http:ActivitesService,private u_http:MembreService,private modalService: NgbModal,private route: ActivatedRoute,private router: Router,private e_http: EventService,private v_http:VoteService,private p_http:PostService,private _http:ClubService,private http: HttpClient) {

   }

  ngOnInit() {

    this.nom=localStorage.getItem('nom');
    this.prenom=localStorage.getItem('prenom');
    this.idclub= this.route.snapshot.paramMap.get('id');
    this.id_membre=localStorage.getItem('id_membre');
    this.getposts();
    this.getClubEvents();
    this.getsondage();
    this.getuserClubs();
    this.getadmin();
    this.getuser(this.id_membre);
    this.getact(this.idclub);
  }

  getuserClubs() {
    this._http.getuserClubs().subscribe(club => {
      this.clubss= club['data'];
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
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-ui-add' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }
  open() {
    this.buttontext="Annuler";
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-ui-add' : 'icofont-close';
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

      if(data['error']!=true){
       swal("Vous avez votè!", "votre vote a été enregistré avec succès", "success");

      }else{
       swal("Erreur!", data['message'], "error");

      }
    },
      err => {
    console.log(err);
      }
    );
  }

//participer
gotolisteparticipates(id_event:any, nomevent:any ){
  this.router.navigate(['dashboard_club/liste-participes/'+id_event]);
  nomevent = localStorage.setItem('nomevent',nomevent);

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
      swal("Succès!", "votre event a été enregistré avec succès", "success");

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
        swal("Erreur!", data['message'], "error");
    }
  },
    err => {

   console.log(err);
    }
  );
 }

 imagePost(e:any){
  this.post_image=e.target.files[0];
  this.fileName=e.target.files[0].name;
  }

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
        //swal("Erreur!", data['message'], "error");
    }
  },
    err => {
  //show error toast when the server went wrong
  console.log(err);
    }
  );
}
//activites
getact(idclub:any){
  this.a_http.getclubactivites(idclub).subscribe(club => {
    this.activites= club['data'];
    this.activites = Object.entries(this.activites).map((e) => (e[1]));
   
   
  },
  error => {
    console.log(error);
  });
}

imageact(e:any){
  this.image_act=e.target.files[0];
  this.fileName=e.target.files[0].name;
  }
addactivites(){
  const formData = new FormData();
  formData.append('titre_act', this.titre_act);
  formData.append('description_act', this.description_act);
  formData.append('idclub', this.idclub);
  formData.append('file', this.image_act);
  formData.append('date_act', this.date_act);

  this.a_http.addclubactivites(formData).subscribe(data => {

    if(data['error']!=true){
      swal("Succès!", "votre activite a été enregistré avec succès", "success");

         this.titre_act='';
      this.image_act='';
      this.description_act='';
     this.editProfile = !this.editProfile;
      this.getact(this.idclub);

      this.fileName=""
       }else{
        swal("Erreur!", data['message'], "error");
    }
  },
    err => {
  //show error toast when the server went wrong
  console.log(err);
    }
  );
}


// all delete fnc
deleteact(id_activites:any){
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
      this.a_http.deleteactivites(this.idclub,id_activites).subscribe(club => {
        if(club['error']!=true){
          this.getact(this.idclub);

         }else{
           swal("Erreur!", club['message'], "error");
         }

      },
      error => {
        console.log(error);
      });
      swal("Votre activite a été supprimer!", {
        icon: "success",
      });
    } else {
      swal("Votre fichier est en sécurité !");
    }
  });


}

deletePOST(idpublication:any){
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
      this.p_http.deletePost(idpublication).subscribe(club => {
        if(club['error']!=true){
          this.getposts();

         }else{
           swal("Erreur!", club['message'], "error");
         }

      },
      error => {
        console.log(error);
      });
      swal("Votre publication a été supprimer!", {
        icon: "success",
      });
    } else {
      swal("Votre fichier est en sécurité !");
    }
  });

}

deleteSONDAGE(idsondage:any){
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
      this.v_http.deleteSondage(idsondage).subscribe(club => {
        if(club['error']!=true){
          this.getsondage();

         }else{
           swal("Erreur!", club['message'], "error");
         }


      },
      error => {
        console.log(error);
      });
      swal("Votre sondage a été supprimer!", {
        icon: "success",
      });
    } else {
      swal("Votre fichier est en sécurité !");
    }
  });

}
deleteEVENT(idevent:any){
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

  this.e_http.deleteEvent(idevent).subscribe(club => {
    if(club['error']!=true){
      this.getClubEvents();

     }else{
       swal("Erreur!", club['message'], "error");
     }


  },
  error => {
    console.log(error);
  });
      swal("Votre evenement a été supprimer!", {
        icon: "success",
      });
    } else {
      swal("Votre fichier est en sécurité !");
    }
  });


}
}


