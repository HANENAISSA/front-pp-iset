import { Component, OnInit } from '@angular/core';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-accueil-club',
  templateUrl: './accueil-club.component.html',
  styleUrls: ['./accueil-club.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
}]
})
export class AccueilClubComponent implements OnInit {
post!:any;
posts:any=[];
cmtrs:any=[];
sondages:any=[];
votes:any=[];
idclub:any;
  cmtre: any;
  title: any;
  constructor(private v_http:VoteService,private p_http:PostService) { }

  ngOnInit() {
   // this.getposts();
    //this.getcmtre();
    //this.getsondage();
    //this.getvote();
  }

//post
  getposts(idclub:any) {
    this.p_http.getposts(idclub).subscribe(club => {
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
        console.log(data["token"])
        localStorage.setItem("token",data["token"])
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
        console.log(club);
      },
      error => {
        console.log(error);
      });

  }

  addcmtre(idpublication:any){
    this.p_http.addComment(idpublication,this.cmtre).subscribe(data => {
      if(data['error']!=true){
        console.log(data["token"])
        localStorage.setItem("token",data["token"])
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
  getsondage(idclub:any){
    this.v_http.getsondage(idclub).subscribe(club => {
      this.sondages= club['data'];
      console.log(club);
    },
    error => {
      console.log(error);
    });
  }

  addsondage(){
    this.p_http.addComment(this.title,this.idclub).subscribe(data => {
      if(data['error']!=true){
        console.log(data["token"])
        localStorage.setItem("token",data["token"])
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
  getvote(idsondage:any){
    this.v_http.getVotes(idsondage).subscribe(club => {
      this.votes= club['data'];
      console.log(club);
    },
    error => {
      console.log(error);
    });
  }

  addvote(satut:any,idsondage:any){
    this.p_http.addComment(satut,idsondage).subscribe(data => {
      if(data['error']!=true){
        console.log(data["token"])
        localStorage.setItem("token",data["token"])
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
