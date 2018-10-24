import { SessionService } from './../../../shared/services/session.service';
import { Coordinates } from './../../../shared/models/coordinates.model';
import { map } from 'rxjs/operators';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Component, OnInit } from '@angular/core';
import { Commute } from 'src/app/shared/models/commute.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commute-detail',
  templateUrl: './commute-detail.component.html',
  styleUrls: ['./commute-detail.component.css']
})
export class CommuteDetailComponent implements OnInit {

  commute: Commute = new Commute();
  lng: number;
  lat: number;
  origin: Coordinates;
  destination: Coordinates;
  userId: string;
  zoom: number;

  constructor(
    private commutesService: CommutesService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.route.data
    .pipe(
      map((data => data.commute))
      ).subscribe((commute: Commute) => this.commute = commute);

    this.setCoordinates();
    this.userId = this.sessionService.user.id;
    this.zoom = 12;
  }

  gotoUserProfile(id: string): void {
    this.router.navigate(['/users', id]);
  }

  onAddPassenger(): void {
    this.commutesService.addPassenger(this.commute.id).subscribe((commute: Commute) => {
      this.commute = commute;
    });
  }

  onContactDriver() {
    this.router.navigate(['/users', this.userId, 'messages', this.commute.driver.id]);
  }

  private setCoordinates() {
    const originLat = this.commute.origin[0];
    const originLng = this.commute.origin[1];
    const destinationLat = this.commute.destination[0];
    const destinationLng = this.commute.destination[1];

    this.origin = { lat: originLat, lng: originLng };
    this.destination = { lat: destinationLat, lng: destinationLng };
  }

  private isMe() {
    if (this.userId === this.commute.driver.id) {
      return true;
    } else {
      return false;
    }
  }

}
