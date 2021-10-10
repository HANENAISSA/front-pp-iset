import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
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
import swal from 'sweetalert';
import { PopupComponent } from '../../../../popup/popup.component';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClubService } from '../../services/club.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-calendrier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  add: boolean=false;
  constructor(private _http:ClubService,public dialog: MatDialog,private http: HttpClient,private modal: NgbModal,private modalService: NgbModal,private e_http: EventService,private route: ActivatedRoute,private router: Router) {}

 //CALENDRIER
 tasks: any=[];
 descriptionCal: any;
 events:any=[]
 temps: any;
 popup:any=false;
 popupData:any={
  description:"",
  end:"",
  start:"",
  title:"",
  heuredebut:"",
  heurefin:"",
  id_calendrier:"",
  id_event:"",
  date: "" ,
  date_debut:"",
  temps:"",
 };

 date: any;
  idclub: any;
  event: any=[];
  titre:any;
  view: CalendarView = CalendarView.Month;
  locale: string = 'fr';
  viewDate: Date = new Date();
  admin: any;

  activeDayIsOpen: boolean = false;
  refresh: Subject<any> = new Subject();
  @ViewChild('prochaine', {static: false}) div; 

  ngOnInit() {
    this.idclub= this.route.snapshot.paramMap.get('id');
    this.getClubEvents()
    this.getcal(this.idclub);
    this.getadmin();

  }

 

  eventClicked(event){
    this.popup=true
    this.popupData={
      ...event.event
    }
  }
  
  
  
  close(){
    this.popup=false

  }
  getClubEvents(){
    this.e_http.getClubEvents(this.idclub).subscribe(club => {
      
      this.events= [...club['data'].map(e=>{
        
        return{
          start:new Date(e.date_debut),
          end:new Date(e.date_fin),
          title:e.titre_event,
          description:e.description,
          heuredebut:e.heure_debut,
          heurefin:e.heure_fin,
          id_event:e.id_event,
          date:e.date_debut,
          //id:e.id_calendrier
        }
      })];
      
     
    },
    error => {
      console.log(error);
    });
  }
  gotodetails(id_event:any ){
    this.router.navigate(['dashboard_club/details/'+this.idclub+'/'+id_event]);
  
    
  }
getcal(idclub:any){
    this.e_http.getcalendrier(idclub).subscribe(club => {
      
      this.events= [...this.events, ...club['data'].map(e=>{
        console.log(club)
        return{
          start:new Date(e.date),
          end:new Date(e.date),
          title:e.titre,
          description:e.description,
          id_calendrier:e.id_calendrier,
          date:e.date,
          temps:e.temps,
        }
      })]
      ;
    
    document.getElementById('prochaine').click();
    
    document.getElementById('precedent').click();
    document.getElementById('aujourdhui').click();
    },
    error => {
      console.log(error);
    });
  }

  addTOcalendrier(){
    this.e_http.addTOcalendrier(this.idclub,this.titre,this.temps,this.date,this.descriptionCal).subscribe(data => {

      if(data['error']!=true){
        this.add=false;
        window.location.reload();
     
        
         }else{
         swal("Erreur!", data['message'], "error");
      }
    },
      err => {
    
    console.log(err);
      }
    );
  }

  addEvent(){
    this.add=true
  }
  closevent(){
    this.add=false

  }
  getadmin() {
    this._http.getadmin(this.idclub).subscribe(club => {
      this.admin= club['isAdmin'];



    },
    error => {
      console.log(error);
    });
  }
  
deleteCAL(idcalendrier:any){
   swal({
    title: "Es-tu sûr?",
    text: "Une fois supprimé, vous ne pourrez plus récupérer ce fichier!",
    icon: "warning",
    buttons: {
      cancel: true,
      confirm: true,
    },
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      
  this.e_http.deleteTask(idcalendrier).subscribe(club => {
    if(club['error']!=true){
      this.add=false;
      window.location.reload();
      this.getcal(this.idclub);
   
      
       }else{
        swal("Erreur!", club['message'], "error");
    }
    this.add=false
   

  },
  error => {
    console.log(error);
  });
      swal("Votre evenement a été supprimer!", {
        icon: "success",
      });
      this.add=false
    } else {
      swal("Votre fichier est en sécurité !");
    }
  });

 
}

 
}

