import { FilterCriteria } from './../../../shared/models/filter-criteria.model';
import { GeoService } from './../../../shared/services/geo.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  datePick: Date;

  searchControl: FormControl;
  @ViewChild('origin') originInput: ElementRef;
  originChangesSubscription: Subscription;

  @ViewChild('destination') destinationInput: ElementRef;
  destinationChangesSubscription: Subscription;


  @Output() criteriaUpdate: EventEmitter<FilterCriteria> = new EventEmitter();
  @ViewChild('searchCommute') searchForm: FormGroup;


  constructor(private geoService: GeoService) { }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.geoService.setOrigin(this.originInput);
    this.originChangesSubscription = this.geoService.onOriginChanges()
      .subscribe((origin: Coordinates) => {
        this.criteria.origin_lat = origin.lat;
        this.criteria.origin_lng = origin.lng;
        this.criteriaUpdate.emit(this.criteria);
    });


    this.geoService.setDestination(this.destinationInput);
    this.destinationChangesSubscription = this.geoService.onDestinationChanges()
        .subscribe((destination: Coordinates) => {
          this.criteria.dest_lat = destination.lat;
          this.criteria.dest_lng = destination.lng;
          this.criteriaUpdate.emit(this.criteria);

    });
  }

  ngOnDestroy() {
    this.originChangesSubscription.unsubscribe();
    this.destinationChangesSubscription.unsubscribe();
  }

  onChangesCriteria() {
    this.formatTime(this.datePick);
    this.criteriaUpdate.emit(this.criteria);
  }

  private formatTime(date) {
    date = new Date(date);

    let date_from  = new Date (date.setMinutes(date.getMinutes() - 30));
    let date_to = new Date (date.setMinutes(date.getMinutes() + 60));

    date_from = new Date(date_from).toISOString();
    date_to = new Date(date_to).toISOString();

    this.criteria.date_from = date_from;
    this.criteria.date_to = date_to;
  }

}
