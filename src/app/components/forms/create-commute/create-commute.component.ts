import { VehiclesService } from './../../../shared/services/vehicles.service';
import { Vehicle } from './../../../shared/models/vehicle.model';
import { Subscription } from 'rxjs';
import { SessionService } from './../../../shared/services/session.service';
import { User } from './../../../shared/models/user.model';
import { Router } from '@angular/router';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Commute } from './../../../shared/models/commute.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateVehicleComponent } from '../create-vehicle/create-vehicle.component';

@Component({
  selector: 'app-create-commute',
  templateUrl: './create-commute.component.html',
  styleUrls: ['./create-commute.component.css']
})
export class CreateCommuteComponent implements OnInit, OnDestroy {

  commute: Commute = new Commute();
  authUser: User = new User();
  onAuthUserChanges: Subscription = new Subscription();
  vehicle: Vehicle = new Vehicle();
  isVehicleFormValid: boolean = false;
  @ViewChild(CreateVehicleComponent) createVehicle: CreateVehicleComponent;
  @ViewChild('createCommuteForm') createCommuteForm: FormGroup;

  constructor(
    private commutesService: CommutesService,
    private router: Router,
    private sessionService: SessionService, 
    private vehiclesService: VehiclesService
  ) { }

  ngOnInit() {
    this.authUser = this.sessionService.user;

    if (!this.authUser.vehicles) {
      this.authUser.vehicles.push(this.vehicle);
    }

    this.onAuthUserChanges = this.sessionService.onUserChanges()
    .subscribe((user: User) => this.authUser = user);

  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
  }

  onSubmitCreateCommute(commuteForm: FormGroup) {
    console.log(this.createVehicle);
    console.log(commuteForm);
    if (commuteForm.valid && this.isVehicleFormValid) {
      this.vehiclesService.create(this.authUser.id, this.createVehicle.vehicle)
      .subscribe((vehicle: Vehicle) => {
        this.commutesService.createCommute(this.commute)
        .subscribe(() => {
          commuteForm.reset();
          this.router.navigate(['/commutes', this.commute.id]);
        });
      });
    }
  }

  onCreateVehicleFormChanges(valid: boolean) {
    this.isVehicleFormValid = valid;
  }


}
