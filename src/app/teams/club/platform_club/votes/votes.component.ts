import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  votes:any=[];
  @Input() public idpublication: any;
  constructor(private _http:PostService) { }


  ngOnInit() {
  }

}
