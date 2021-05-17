import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { ClubService } from '../../services/club.service';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-test',
  templateUrl: './testaccueil.component.html',
  styleUrls: ['./testaccueil.component.scss'],
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
export class TestaccueilComponent implements OnInit {
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

    constructor(private v_http:VoteService,private p_http:PostService,private _http:ClubService) { }

    ngOnInit() {
      this.nom=localStorage.getItem('nom');
      this.prenom=localStorage.getItem('prenom');
      this.idclub=localStorage.getItem('id_club');
     this.getposts();

      //this.getcmtre();
     this.getsondage();
      //this.getvote();
      //this.getuserClubs();

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
          console.log(data["posts"])
          localStorage.setItem("posts",data["posts"])
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
    /*getcmtre(idpublication:any) {
      this.p_http.getComments(idpublication).subscribe(club => {
          this.cmtrs= club['data'];
         // console.log(club);
        },
        error => {
          console.log(error);
        });

    }*/

    addcmtre(idpublication:any){
      this.p_http.addComment(idpublication,this.cmtre).subscribe(data => {
        if(data['error']!=true){

          localStorage.setItem("cmtres",data["cmtres"])
          console.log(data["cmtres"])
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
          console.log(data["sondages"])
          localStorage.setItem("sondages",data["sondages"])
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

    voter(satut:any,idsondage:any){
      this.v_http.addVote(satut,idsondage).subscribe(data => {
        //console.log(idsondage)
        if(data['error']!=true){
          console.log(idsondage)
          localStorage.setItem("votes",data["votes"])
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

    /*getuserClubs() {
      this._http.getuserClubs().subscribe(club => {
        this.clubs= club['data'];
        console.log(club);
      },
      error => {
        console.log(error);
      });
    }*/


  }
