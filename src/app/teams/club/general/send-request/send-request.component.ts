import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-send-request',
  templateUrl: './send-request.component.html',
  styleUrls: ['./send-request.component.scss']
})
export class SendRequestComponent implements OnInit {
  cin?:String;
  equipe?: String;
  email?: String;
  motivation?: String;
  club?:any;
  equipes: any =[];
  constructor(private _http:RequestService,private route: ActivatedRoute,private router: Router) {

  }
  ngOnInit(): void {
 this.getteams();

this.club = this.route.snapshot.paramMap.get('id');
  }

sendRequest(){
    /*this._http.sendRequest(this.cin,this.equipe,this.club,this.motivation,
       this.email
      ).subscribe(data => {
      console.log(data)
      if(data['error']!=true){
        console.log(data["token"])
        localStorage.setItem("token",data["token"])
        localStorage.setItem("id_club",data['data']['id_club']);
        this.router.navigate(['dashboard_accueil/clubs']);
        window.alert('votre demande a été envoyé avec succès')
      }else{
        alert(data['message'])
      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );*/
  //this.router.navigate(['']);
}
  getteams() {
    this._http.getTeams()
      .subscribe(
        club => {
          this.equipes= club['data'];
          console.log(this.equipes)
        },
        error => {
          console.log(error);
        });
  }
  fun(e: any){
    this.equipe = e.target.value;
  }
}
