import { Coordinates } from './../../shared/models/coordinates.model';
import { Subscription } from 'rxjs';
import { GeoService } from './../../shared/services/geo.service';
/// <reference types="@types/googlemaps" />
import { Component, OnInit, NgModule, ViewChild, ElementRef, OnDestroy} from '@angular/core';

import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //lat: number;
  //lng: number;
  origin: Coordinates;
  originChanges: Subscription;

  destination: Coordinates;
  destinationChanges: Subscription;

  searchControl: FormControl;
  zoom: number;

  @ViewChild('searchOr') public searchElementRefOr: ElementRef;
  @ViewChild('searchDes') public searchElementRefDes: ElementRef;


  constructor( private geoService: GeoService) { }

  ngOnInit() {
    console.log('inicio componente');

    this.searchControl = new FormControl();

    // this.geoService.setCurrentPosition();

    // Origin
    this.geoService.setOrigin(this.searchElementRefOr);
    this.originChanges = this.geoService.onOriginChanges()
      .subscribe((origin: Coordinates) => this.origin = origin);

    // Destination
    this.geoService.setDestination(this.searchElementRefDes);
    this.destinationChanges = this.geoService.onDestinationChanges()
    .subscribe((destination: Coordinates) => this.destination = destination);

  }

  ngOnDestroy() {
    this.destinationChanges.unsubscribe();
    this.originChanges.unsubscribe();
  }


}
