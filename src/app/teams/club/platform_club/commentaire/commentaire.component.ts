import { Component, Input, OnInit } from '@angular/core';
import { MembreService } from '../../services/membre.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  user: any=[];
  cmtrs:any=[];
  @Input() public idpublication: any;
  id_membre: any;
  constructor(private u_http:MembreService,private _http:PostService) { }


  ngOnInit() {
    this.id_membre=localStorage.getItem('id_membre');
this.getcmtre(this.idpublication);
this.getuser(this.id_membre);
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
//commantaire
getcmtre(idpub:any) {
  this._http.getComments(idpub).subscribe(club => {
      this.cmtrs= club['data'];
      console.log(club);
    },
    error => {
      console.log(error);
    });

}
deleteCMTRE(id_commentaire:any){
  this._http.deleteComment(id_commentaire).subscribe(club => {
    console.log(club);
    this.getcmtre(this.idpublication);

  },
  error => {
    console.log(error);
  });
}
}
