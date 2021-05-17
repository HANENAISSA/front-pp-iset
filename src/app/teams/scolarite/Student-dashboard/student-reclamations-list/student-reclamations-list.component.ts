import { Component, OnInit } from '@angular/core';
import { Reclamation } from '../../models/reclamation.model';
import { ReclamationService } from '../../services/reclamation.service';

@Component({
  selector: 'app-student-reclamations-list',
  templateUrl: './student-reclamations-list.component.html',
  styleUrls: ['./student-reclamations-list.component.scss']
})
export class StudentReclamationsListComponent implements OnInit {
  page = 1;
  pageSize = 2;
  pageSizes = [2, 4, 6];
  reclamations : Reclamation[];
  public search:any = '';
  constructor(private service:ReclamationService) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData(){
    this.reclamations = this.service.getReclamations();
  }

  deleteReclamation(indice : number){
    this.service.deleteReclamation(indice);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.refreshData();
  }

}
