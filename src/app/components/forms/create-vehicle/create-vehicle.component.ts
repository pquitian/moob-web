import { ApiErrors } from './../../../shared/models/api-errors.model';
import { Vehicle } from './../../../shared/models/vehicle.model';
import { SessionService } from './../../../shared/services/session.service';
import { VehiclesService } from './../../../shared/services/vehicles.service';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {

  apiError: ApiErrors;
  userId: string;
  vehicle: Vehicle = new Vehicle();
  @ViewChild('createVehicleForm') createVehicleForm: FormGroup;
  @Output() formVehicleUpdate: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private vehiclesService: VehiclesService,
    private sessionService: SessionService,
    ) { }

  ngOnInit() {
    this.userId = this.sessionService.user.id;
  }

  onCreateVehicle(vehicle) {
    console.log(vehicle);
  }

  onFormUpdated() {
    this.formVehicleUpdate.emit(this.createVehicleForm.valid);
  }
}
