import { ApiErrors } from './../../../shared/models/api-errors.model';
import { GeoService } from './../../../shared/services/geo.service';
import { VehiclesService } from './../../../shared/services/vehicles.service';
import { Vehicle } from './../../../shared/models/vehicle.model';
import { Subscription } from 'rxjs';
import { SessionService } from './../../../shared/services/session.service';
import { User } from './../../../shared/models/user.model';
import { Router } from '@angular/router';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Commute } from './../../../shared/models/commute.model';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateVehicleComponent } from '../create-vehicle/create-vehicle.component';
import { Coordinates } from 'src/app/shared/models/coordinates.model';

@Component({
  selector: 'app-create-commute',
  templateUrl: './create-commute.component.html',
  styleUrls: ['./create-commute.component.css']
})
export class CreateCommuteComponent implements OnInit, OnDestroy {

  apiError: ApiErrors;
  commute: Commute = new Commute();
  authUser: User = new User();
  onAuthUserChanges: Subscription = new Subscription();
  vehicle: Vehicle = new Vehicle();
  isVehicleFormValid: boolean = false;
  @ViewChild(CreateVehicleComponent) createVehicle: CreateVehicleComponent;
  @ViewChild('createCommuteForm') createCommuteForm: FormGroup;

  searchControl: FormControl;
  @ViewChild('origin') originInput: ElementRef;
  origin: Coordinates = new Coordinates();
  originChangesSubscription: Subscription;

  @ViewChild('destination') destinationInput: ElementRef;
  destination: Coordinates = new Coordinates();
  destinationChangesSubscription: Subscription;

  constructor(
    private commutesService: CommutesService,
    private router: Router,
    private sessionService: SessionService,
    private vehiclesService: VehiclesService,
    private geoService: GeoService
  ) { }

  ngOnInit() {
    this.authUser = this.sessionService.user;

    if (!this.authUser.vehicles) {
      this.authUser.vehicles.push(this.vehicle);
    }

    this.onAuthUserChanges = this.sessionService.onUserChanges()
    .subscribe((user: User) => this.authUser = user);

    this.searchControl = new FormControl();
    this.geoService.setOrigin(this.originInput);
    this.originChangesSubscription = this.geoService.onOriginChanges()
      .subscribe((origin: Coordinates) => this.origin = origin );

    this.geoService.setDestination(this.destinationInput);
    this.destinationChangesSubscription = this.geoService.onDestinationChanges()
        .subscribe((destination: Coordinates) => this.destination = destination );

  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
    this.originChangesSubscription.unsubscribe();
    this.destinationChangesSubscription.unsubscribe();
  }

  onSubmitCreateCommute(commuteForm: FormGroup): void {
    const originValue = this.originInput.nativeElement.value;
    const destinationValue = this.destinationInput.nativeElement.value;

    this.setCommuteAddress(originValue, destinationValue);
    this.setLatLong();

    if (commuteForm.valid && this.isVehicleFormValid) {
      this.vehiclesService.create(this.authUser.id, this.createVehicle.vehicle)
      .subscribe((vehicle: Vehicle) => {
        this.commutesService.createCommute(this.commute)
        .subscribe(() => {
          commuteForm.reset();
          // this.router.navigate(['/commutes', this.commute.id]);
          this.router.navigate(['/search']);
        });
      });
    }

    if (commuteForm.valid && this.commute.vehicle) {
      this.commutesService.createCommute(this.commute)
        .subscribe(() => {
          commuteForm.reset();
          // this.router.navigate(['/commutes', this.commute.id]);
          this.router.navigate(['/search']);
        });
    }
  }

  onCreateVehicleFormChanges(valid: boolean) {
    this.isVehicleFormValid = valid;
  }

  private setCommuteAddress(origin, destination): void {
    const o = origin.split(',');
    const d = destination.split(',');

    if (o.length >= 4) {
      this.commute.hrOrigin = `${o[0]},${o[1]}`;
    } else {
      this.commute.hrOrigin = o[0];
    }

    if (d.length >= 4) {
      this.commute.hrDestination = `${d[0]},${d[1]}`;
    } else {
      this.commute.hrDestination = d[0];
    }
  }

  private setLatLong() {
    this.commute.origin[0] = this.origin.lat;
    this.commute.origin[1] = this.origin.lng;
    this.commute.destination[0] = this.destination.lat;
    this.commute.destination[1] = this.destination.lng;
  }


}
