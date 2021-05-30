import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  votes:any=[];
  @Input() public idsondage: any;
  constructor(private v_http:VoteService) { }


  ngOnInit() {
    this.getvotes(this.idsondage);
  }
  //vote
  getvotes(idsondage:any){
    this.v_http.getVotes(idsondage).subscribe(club => {
      this.votes= club['data'];
     // console.log(club);
    },
    error => {
      console.log(error);
    });
  }
}
