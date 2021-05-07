import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-liste-clubs',
  templateUrl: './liste-clubs.component.html',
  styleUrls: ['./liste-clubs.component.scss']
})
export class ListeClubsComponent implements OnInit {
  clubs: any = [];
  constructor(private http:ClubService,private _http:ClubService,private  router: Router)
  { }

  ngOnInit(): void {
    this.getclubs();
  }

  getclubs() {
    this._http.getClubs()
      .subscribe(
        club => {
          this.clubs= club['data'];
          console.log(club);
        },
        error => {
          console.log(error);
        });
  }
  inscrire(id:any){
    this.router.navigate(['/demande/'+id]);
  }
}
