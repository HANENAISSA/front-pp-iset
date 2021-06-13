import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-tocalendrier',
  templateUrl: './add-tocalendrier.component.html',
  styleUrls: ['./add-tocalendrier.component.scss']
})
export class AddTOcalendrierComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal ) { }


  ngOnInit() {
  }

}
