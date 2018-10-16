import { FilterCriteria } from './../../../shared/models/filter-criteria.model';
import { GeoService } from './../../../shared/services/geo.service';
import { FormControl } from '@angular/forms';
import { Coordinates } from 'src/app/shared/models/coordinates.model';
import { Subscription } from 'rxjs';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit, OnDestroy {

  criteria: FilterCriteria = new FilterCriteria();
  origin: Coordinates = new Coordinates();

  searchControl: FormControl;
  @ViewChild('origin') originInput: ElementRef;
  // origin: Coordinates = new Coordinates();
  originChangesSubscription: Subscription;

  @ViewChild('destination') destinationInput: ElementRef;
  // destination: Coordinates = new Coordinates();
  destinationChangesSubscription: Subscription;

  // @Output() originUpdate: EventEmitter<Coordinates> = new EventEmitter();
  // @Output() destinationUpdate: EventEmitter<Coordinates> = new EventEmitter();

  @Output() criteriaUpdate: EventEmitter<FilterCriteria> = new EventEmitter();


  constructor(private geoService: GeoService) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.geoService.setOrigin(this.originInput);
    this.originChangesSubscription = this.geoService.onOriginChanges()
      .subscribe((origin: Coordinates) => {
        this.criteria.origin_lat = origin.lat;
        this.criteria.origin_lng = origin.lng;
        this.criteriaUpdate.emit(this.criteria);
        // this.origin = origin;
        // this.originUpdate.emit(this.origin);
    });


    this.geoService.setDestination(this.destinationInput);
    this.destinationChangesSubscription = this.geoService.onDestinationChanges()
        .subscribe((destination: Coordinates) => {
          this.criteria.dest_lat = destination.lat;
          this.criteria.dest_lng = destination.lng;
          this.criteriaUpdate.emit(this.criteria);
          // this.destination = destination;
          // this.destinationUpdate.emit(this.destination);
    });
  }

  ngOnDestroy() {
    this.originChangesSubscription.unsubscribe();
    this.destinationChangesSubscription.unsubscribe();
  }

  onChangesCriteria() {
    this.criteriaUpdate.emit(this.criteria);
  }

}
