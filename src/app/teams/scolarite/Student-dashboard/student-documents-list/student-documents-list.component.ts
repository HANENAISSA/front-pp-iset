import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Document } from '../../models/document.model';
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
  documents : Document[];
  public search:any = '';
  constructor(private service:DocumentService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(){
    this.documents = this.service.getDocuments();
  }

  deleteDocument(indice : number){
    this.service.deleteDocument(indice);
  }

  filterItemsByType(type){
    return this.documents.filter(x => x.status == type);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData();
  }
}
