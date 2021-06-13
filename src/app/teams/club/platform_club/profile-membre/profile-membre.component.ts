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
  editProfileIcon = 'icofont-ui-edit';


  public basicContent: string;


  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;
 //listes
  user:any =[];
  clubs:any =[];
   //local storage items
  idmembre:any;
  prenom: string;
  nom: string;
  role: string;
  //update fields
  email:any;
  motdepasse:any;
//message confirmation
  message = '';
  file: any;

  constructor(private http:ClubService,private _http:MembreService,private  router: Router)
  { }

  ngOnInit(): void {
//this.getuserClubs();
    this.idmembre=localStorage.getItem('id_membre') ;
    this.nom=localStorage.getItem('nom');
    this.prenom=localStorage.getItem('prenom');

    this.role=localStorage.getItem('role');

    this.getuser(this.idmembre);
    //this.email=this.user.email;
    //console.log(this.email)
    this.message='';
  }
  getuser(id_membre:any) {
    this._http.getUser(id_membre)
      .subscribe(
        club => {
          this.user= club['data'];

        },
        error => {
          console.log(error);
        });
  }

  Updateuser() {
    this._http.UpdateUser(this.idmembre,this.email,this.motdepasse)
    .subscribe(data => {

      if(data['error']!=true){

        console.log(data)
        window.alert('votre profile a été modifier avec succès');

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
  imageProfil(e:any){
    this.file=e.target.files[0];
    console.log(e.target.files[0])
    }
  //this.idclub,this.post
   updatePic(){
    const formData = new FormData();

    formData.append('file', this.file);
      console.log(this.file)
    this._http.UpdatePic(formData).subscribe(data => {
      if(data['error']!=true){
        this.file='';

        this.getuser(this.idmembre);
        console.log(data)

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
  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
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
