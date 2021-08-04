import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format,
} from 'date-fns';
import { Observable } from 'rxjs';

import { PopupComponent } from '../../../../popup/popup.component';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Film {
  id: number;
  title: string;
  release_date: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}
@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {

 //CALENDRIER
 tasks: any=[];
 descriptionCal: any;
 temps: any;
 date: any;
  idclub: any;
  event: any=[];
  titre:any='hi';
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$: Observable<CalendarEvent<{ film: Film }>[]>;

  activeDayIsOpen: boolean = false;
 
  ngOnInit() {
    this.idclub= this.route.snapshot.paramMap.get('id');
    this.getcal(this.idclub) ;
    this.getClubEvents();
    this.fetchEvents();
  }

  getClubEvents(){
    this.e_http.getClubEvents(this.idclub).subscribe(club => {
      this.event= club['data'];
      console.log(this.event.titre_event);
      
    for( let e of this.event){
      this.titre=e.titre_event ;
      console.log(this.titre);
      
    }
   
    },
    error => {
      console.log(error);
    });
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay,
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay,
    }[this.view];

    const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'yyyy-MM-dd')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'yyyy-MM-dd')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.http
      .get('https://api.themoviedb.org/3/discover/movie', { params })
      .pipe(
        map(({ results }: { results: Film[] }) => {
          return results.map((film: Film) => {
            return {
              title: film.title,
              start: new Date(
                film.release_date + getTimezoneOffsetString(this.viewDate)
              ),
              //color: colors.yellow,
              allDay: true,
              meta: {
                film,
              },
            };
          });
        })
      );
  }

  dayClicked({
    date,
    events,
  }: {
    date: Date;
    events: CalendarEvent<{ film: Film }>[];
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ film: Film }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.film.id}`,
      '_blank'
    );
  }

  
  
  
  constructor(private http: HttpClient,private modal: NgbModal,private modalService: NgbModal,private e_http: EventService,private route: ActivatedRoute,private router: Router) {}

 

  addEvent(): void {
    this.event = [
      ...this.event,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        //color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.event = this.event.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  //calendar 
  //calendrier
  getcal(idclub:any){
  this.e_http.getcalendrier(idclub).subscribe(club => {
    this.tasks= club['data'];
   // console.log(club);
  },
  error => {
    console.log(error);
  });
}
addTOcalendrier(){
  this.e_http.addTOcalendrier(this.idclub,this.temps,this.date,this.descriptionCal).subscribe(data => {
    if(data['error']!=true){
      //this.add=!this.add;
      this.getcal(this.idclub);

      console.log(data)
      //localStorage.setItem("sondages",data["sondages"])
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
deleteCAL(idcalendrier:any){
  this.e_http.deleteTask(idcalendrier).subscribe(club => {
    console.log(club);
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.name = 'vous avez supprimer un evenement de calendrier';
    modalRef.componentInstance.message = 'Supprimer';
    this.getcal(this.idclub);

  },
  error => {
    console.log(error);
  });
}
/*
//events
getClubEvents(){
  this.e_http.getClubEvents(this.idclub).subscribe(club => {
    this.events= club['data'];
    console.log(club);
  },
  error => {
    console.log(error);
  });
}*/
}

