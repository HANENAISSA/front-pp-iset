import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../../services/club.service';
import { MembreService } from '../../services/membre.service';

@Component({
  selector: 'app-membres',
  templateUrl: './membres.component.html',
  styleUrls: ['./membres.component.scss']
})
export class MembresComponent implements OnInit {
  membres: any = [];
  idclub: any;
  users: any= [];
  responsables: any= [];

  constructor(private _http:ClubService,private route: ActivatedRoute)
  { }

  ngOnInit() {
    this.idclub= this.route.snapshot.paramMap.get('id');
    this.getmembres(this.idclub);
    this.getClubUsers(this.idclub);
  }
  getClubUsers(id_club:any) {
    this._http.getClubUsers(id_club)
      .subscribe(
        club => {
          this.users= club['data'];
console.log(club['data'])
        },
        error => {
          console.log(error);
        });
  }
  getmembres(id_club:any) {
    this._http.getMembres(id_club)
      .subscribe(
        club => {
          this.membres= club['data'];
console.log(club['data'])
        },
        error => {
          console.log(error);
        });
  }
  getresponsables(id_club:any) {
    this._http.getResponsables(id_club)
      .subscribe(
        club => {
          this.responsables= club['data'];
console.log(club['data'])
        },
        error => {
          console.log(error);
        });
  }
}
