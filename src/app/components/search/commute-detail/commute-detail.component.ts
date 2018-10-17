import { map } from 'rxjs/operators';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Component, OnInit } from '@angular/core';
import { Commute } from 'src/app/shared/models/commute.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commute-detail',
  templateUrl: './commute-detail.component.html',
  styleUrls: ['./commute-detail.component.css']
})
export class CommuteDetailComponent implements OnInit {

  commute: Commute = new Commute();

  constructor(
    private commutesService: CommutesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .pipe(
        map((data => data.commute))
      ).subscribe((commute: Commute) => this.commute = commute);
  }

}
