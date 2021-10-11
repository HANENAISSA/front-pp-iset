import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-detail-event-accueil',
  templateUrl: './detail-event-accueil.component.html',
  styleUrls: ['./detail-event-accueil.component.scss']
})
export class DetailEventAccueilComponent implements OnInit {
  idevent: any;
  event: any = [];
  constructor(private http: EventService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.idevent= this.route.snapshot.paramMap.get('id');
    this.getOneEvent();
  }
  participer(id_event:any){
    this.http.participer(id_event).subscribe(data => {
      if(data['error']!=true){
        swal("Succès!", "vous avez participé avec succès", "success");
      }else{
       swal("Erreur!", data['message'], "error");
      }
    },
      err => {
    console.log(err);
      }
    );
  }
  
  getOneEvent(){
    this.http.getOneEvent(this.idevent).subscribe(club => {
      this.event= club['data'];
      
    },
    error => {
      console.log(error);
    });
  }
}
