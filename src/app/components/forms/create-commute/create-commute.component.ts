import { Vehicle } from './../../../shared/models/vehicle.model';
import { Subscription } from 'rxjs';
import { SessionService } from './../../../shared/services/session.service';
import { User } from './../../../shared/models/user.model';
import { Router } from '@angular/router';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Commute } from './../../../shared/models/commute.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-commute',
  templateUrl: './create-commute.component.html',
  styleUrls: ['./create-commute.component.css']
})
export class CreateCommuteComponent implements OnInit {

  commute: Commute = new Commute();
  authUser: User = new User();
  onAuthUserChanges: Subscription = new Subscription();
  vehicle: Vehicle = new Vehicle();

  constructor(
    private commutesService: CommutesService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.authUser = this.sessionService.user;

    if (!this.authUser.vehicles) {
      this.authUser.vehicles.push(this.vehicle);
    }

    this.onAuthUserChanges = this.sessionService.onUserChanges()
    .subscribe((user: User) => this.authUser = user);

    this.commute.vehicle = this.authUser.vehicles[0];
  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
  }

  onSubmitCreateCommute(commuteForm: FormGroup) {
    console.log(commuteForm);
    if (commuteForm.valid) {
      console.log('COMMUTE', this.commute);
      this.commutesService.createCommute(this.commute)
        .subscribe(() => {
          commuteForm.reset();
          this.router.navigate(['/commutes', this.commute.id]);
        });
    }
  }


}
