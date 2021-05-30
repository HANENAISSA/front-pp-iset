import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: any = [];

  constructor(private http: EventService,private  router: Router) { }

  ngOnInit() {
    this.getevents();
  }
  getevents() {
    this.http.getevents()
      .subscribe(
        club => {
          this.events= club['data'];

          console.log(club);
        },
        error => {
          console.log(error);
        });
  }
}
