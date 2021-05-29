import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-student-documents-list',
  templateUrl: './student-documents-list.component.html',
  styleUrls: ['./student-documents-list.component.scss'],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class StudentDocumentsListComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  public search:any = '';
  DocumentEnAttente:any =[];
  DocumentAccepted:any =[];
  DocumentRefused:any =[];
  actualId:number;
  constructor(private service:DocumentService, private router: Router) {
    this.actualId=3;
  }

  ngOnInit() {
    this.refreshData(3);
  }

 private getAccepted(){
    this.service.DocumentAccepted().subscribe({
      next:(data)=>{
    if(data.length>0){
        this.DocumentAccepted = data;
      }else{
        this.DocumentAccepted = [];
      }
      },error:(err)=>{
        this.DocumentAccepted = [];
        return err
      }
    })

  }
  private getEnAttente(){
    this.service.DocumentEnAttente().subscribe({
      next:(data)=>{
    if(data.length>0){
        this.DocumentEnAttente = data;
      }else{
        this.DocumentEnAttente = [];
      }
      },error:(err)=>{
        this.DocumentEnAttente = [];
        return err
      }
    })
  }
  private getRefused(){
    this.service.DocumentRefused().subscribe({
      next:(data)=>{
    if(data.length>0){
        this.DocumentRefused = data;
      }else{
        this.DocumentRefused = [];
      }
      },error:(err)=>{
        this.DocumentRefused = [];
        return err
      }
    })
  }
  refreshData(id:number){
    switch (id) {
      case 1:
        this.getAccepted();
        break;
      case 2:
        this.getRefused();
          break;
      case 3:
        this.getEnAttente();
            break;

      default:
        break;
    }
  }
  deleteDocument(id : number){
    if(confirm("Etes-vous sûre de vouloir supprimer cette demande ?")){
      this.service.deleteDocument(id).subscribe(
       {next:(data)=>{
        const {deleted,result}=data as any;
        if(deleted){
          this.refreshData(this.actualId);
        }

       },error:(error)=>{
        console.log(error)
       }
      });
    }
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData(this.actualId);
  }

  changePapier(event){
    const id=event.nextId;
    this.actualId=id;
    this.refreshData(id)

  }
}
