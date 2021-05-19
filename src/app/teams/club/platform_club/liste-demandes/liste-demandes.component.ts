import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
@Component({
  selector: 'app-liste-demandes',
  templateUrl: './liste-demandes.component.html',
  styleUrls: ['./liste-demandes.component.scss']
})
export class ListeDemandesComponent implements OnInit {
  requests: any=[];

  //isCollapsedMobile: string;
  //isCollapsedSideBar: string;
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  query:any;

  public searchFilter: any = '';
  constructor(private _http:RequestService,private route: ActivatedRoute)
  {
    //this.isCollapsedMobile = 'no-block';
   //this.isCollapsedSideBar = 'no-block';
}


handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    //this.refreshData();
  }
  /*toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }
  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }*/

  ngOnInit(): void {
    this.getrequests();

  }
  getrequests() {
    this._http.getRequests().subscribe(club => {
        this.requests= club['data'];
        console.log(club);
      },
      error => {
        console.log(error);
      });

  }

  Accepter(iddemande:any, email:any ){
     this._http.acceptRequests(iddemande,email).subscribe(data => {
      console.log(data)
      if(data['error']!=true){

        this.getrequests();
        window.alert('le demande a été accepté')
      }else{
        alert(data['message'])
      }

    },
      err => {
    //show error toast when the server went wrong
      }
    );

  }
  Delete(iddemande:any, email:any ){
    this._http.DeleteRequests(iddemande,email).subscribe(data => {
     console.log(data)
     if(data['error']!=true){
      this.getrequests();
      window.alert('le demande a été supprimer')
     }else{
       alert(data['message'])
     }

   },
     err => {
   //show error toast when the server went wrong
     }
   );

 }
}
