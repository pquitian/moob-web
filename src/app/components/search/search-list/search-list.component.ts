import { SessionService } from 'src/app/shared/services/session.service';
import { Observable } from 'rxjs';
import { ApiErrors } from './../../../shared/models/api-errors.model';
import { GeoService } from './../../../shared/services/geo.service';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Router } from '@angular/router';
import { Commute } from './../../../shared/models/commute.model';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  authId: string;
  @Input() commute: Commute = new Commute();

  constructor(
    private router: Router,
    private commutesService: CommutesService,
    private geoService: GeoService,
    private sessionService: SessionService
    ) { }

  ngOnInit() {
    this.authId = this.sessionService.user.id;
  }

  openDetail(id: string): void {
    this.router.navigate(['/commute', id]);
  }

  addPassenger(): any {
    this.commutesService.addPassenger(this.commute.id);
  }


}
