import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
email:String;
  element: HTMLElement;
  constructor(private _http:AuthService,private  router: Router) { }
  ngOnInit() {
  }

sendemail(){
 // this.element = document.getElementById('email')as HTMLElement;
  console.log(this.email)
  this._http.SendEmailForgetPassword(this.email).subscribe(data => {

    if(data['error']!=true){
      console.log(data);
      localStorage.setItem("token",data["token"]);
      this.router.navigate(['/dashboard_accueil/signin']);

    }else{
      alert(data['message'])
    }
  },
    err => {
  //show error toast when the server went wrong
    }
  );

}
/*
resetpassword(){
  this._http.restartPassword(this.password).subscribe(data => {
    console.log(data)
    if(data['error']!=true){
      console.log(data["token"]);
      localStorage.setItem("token",data["token"]);
      this.router.navigate(['/dashboard_accueil/signin']);

    }else{
      alert(data['message'])
    }
  },
    err => {
  //show error toast when the server went wrong
    }
  );
}*/
}
