import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  cmtrs:any=[];
  @Input() public idpublication: any;
  constructor(private _http:PostService) { }


  ngOnInit() {
this.getcmtre(this.idpublication);
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
}
