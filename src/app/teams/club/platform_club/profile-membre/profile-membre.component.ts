import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { MembreService } from '../../services/membre.service';
import { Router } from '@angular/router';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-profile-membre',
  templateUrl: './profile-membre.component.html',
  styleUrls: ['./profile-membre.component.scss'],
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
export class ProfileMembreComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public basicContent: string;


  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;
  user:any =[];
  clubs:any =[];
  idmembre:any;
  prenom: string;

  nom: string;
  role: string;
  constructor(private http:ClubService,private _http:MembreService,private  router: Router)
  { }

  ngOnInit(): void {
//this.getuserClubs();
    this.idmembre=localStorage.getItem('id_membre') ;
    this.nom=localStorage.getItem('nom');
    this.prenom=localStorage.getItem('prenom');

    this.role=localStorage.getItem('role');

 this.getuser(this.idmembre);
  }
  getuser(id_membre:any) {
    this._http.getUser(id_membre)
      .subscribe(
        club => {
          this.user= club['data'];
          console.log(club);
        },
        error => {
          console.log(error);
        });
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }
  getuserClubs() {
    this.http.getuserClubs().subscribe(club => {
      this.clubs= club['data'];
      console.log(club);
    },
    error => {
      console.log(error);
    });
  }
}
