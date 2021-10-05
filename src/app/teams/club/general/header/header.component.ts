import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
// this.router.navigate(['dashboard_accueil/demande/']);
event(){
  this.router.navigate(['club/events']);
}
clubs(){
  this.router.navigate(['accueil/clubs']);
}
calendrier(){
  this.router.navigate(['club/calendrier']);
}
}
