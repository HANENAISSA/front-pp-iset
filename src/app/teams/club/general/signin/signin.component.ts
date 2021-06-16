import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../../../popup/popup.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email?: String;
  password?: String;



  constructor(private _http:AuthService,private  router: Router,private modalService: NgbModal) {

  }
  ngOnInit(): void {

  }
  signin(){
    this._http.login(this.email, this.password).subscribe(data => {
      console.log(data)
      if(data['error']!=true){
        console.log(data["token"]);
        localStorage.setItem("token",data["token"]);
        localStorage.setItem("nom",data['data']['nom']);
        localStorage.setItem("prenom",data['data']['prenom']);
        localStorage.setItem("id_membre",data['data']['id_membre']);

        localStorage.setItem("role",data['data']['role']);

        //localStorage.setItem("id_club",data['data']['id_club']);
        this.router.navigate(['/dashboard_club/accueil']);

      }else{
        const modalRef = this.modalService.open(PopupComponent);
        modalRef.componentInstance.name = data['message'];
        modalRef.componentInstance.message = 'Erreur';
       // alert(data['message'])
      }
    },
      err => {
    //show error toast when the server went wrong
      }
    );

  }


}
