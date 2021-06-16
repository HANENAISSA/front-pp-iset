import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  votes:any;
  @Input() public idsondage: any;
  true: any;
  false: any;
  NumberOfVotesTrue: any;
  NumberOfVotesFalse: any;
  constructor(private v_http:VoteService) { }


  ngOnInit() {
    this.getvotes(this.idsondage);
  }
  //vote
  getvotes(idsondage:any){
    this.v_http.getVotes(idsondage).subscribe(club => {
      this.NumberOfVotesTrue= club['NumberOfVotesTrue'];
      this.NumberOfVotesFalse= club['NumberOfVotesFalse'];
      console.log(this.votes);
    },
    error => {
      console.log(error);
    });
  }
}
