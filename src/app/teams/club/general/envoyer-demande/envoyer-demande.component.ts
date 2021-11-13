import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
//import { DialogElementsExampleDialog } from './dialog-elements-example-dialog';
//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../../popup/popup.component';

@Component({
  selector: 'app-envoyer-demande',
  templateUrl: './envoyer-demande.component.html',
  styleUrls: ['./envoyer-demande.component.scss']
})
export class EnvoyerDemandeComponent implements OnInit {
  cin?:String;
  equipe?: String;
  email?: String;
  motivation?: String;
  club?:any;
  equipes: any =[];
  tel: any;
  constructor(public dialog: MatDialog,private _http:RequestService,private route: ActivatedRoute,private router: Router,private modalService: NgbModal) {

  }
  ngOnInit(): void {
 this.getteams();

this.club = this.route.snapshot.paramMap.get('id');
  }

sendRequest(){
    this._http.sendRequest(this.cin,this.equipe,this.club,this.motivation,
       this.email,this.tel
      ).subscribe(data => {
      console.log(data)
      if(data['error']!=true){
        console.log(data["token"])
        localStorage.setItem("token",data["token"])
       // localStorage.setItem("id_club",data['data']['id_club']);
        this.router.navigate(['accueil/clubs']);
       // window.alert('votre demande a été envoyé avec succès')
        const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = 'votre demande a été envoyé avec succès';
        modalRef.componentInstance.message = 'Succès';
      }else{
        //alert(data['message'])
        const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = data['message'];
        modalRef.componentInstance.message = 'Erreur';
      }
    },
      err => {
    //show error toast when the server went wrong
    console.log(err);
      }
    );
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
