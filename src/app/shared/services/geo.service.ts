/// <reference types="@types/googlemaps" />
import { Subject, Observable } from 'rxjs';
import { Coordinates } from './../models/coordinates.model';
import { environment } from '../../../environments/environment';
import { Injectable, NgZone, ElementRef } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  origin: Coordinates = new Coordinates();
  originSubject: Subject<Coordinates> = new Subject();
  destination: Coordinates = new Coordinates();
  destinationSubject: Subject<Coordinates> = new Subject();
  zoom: number;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  setOrigin(searchElementRef: ElementRef) {
    this.mapsAPILoader.load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(searchElementRef.nativeElement, {
          types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // It gets the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            // set latitude, longitude and zoom
            this.origin.lat = place.geometry.location.lat();
            this.origin.lng = place.geometry.location.lng();
            this.notifyOriginChanges();
            this.zoom = 14;
          });
        });
      });
  }

  setDestination(searcElementRef: ElementRef) {
    this.mapsAPILoader.load()
      .then(() => {
        const autocomplete = new google.maps.places.Autocomplete(searcElementRef.nativeElement, {
          types: ['address']
        });
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // It gets the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            // set latitude, longitude and zoom
            this.destination.lat = place.geometry.location.lat();
            this.destination.lng = place.geometry.location.lng();
            this.notifyDestinationChanges();
            this.zoom = 14;
          });
        });
      });
  }

  onOriginChanges(): Observable<Coordinates> {
    return this.originSubject.asObservable();
  }

  onDestinationChanges(): Observable<Coordinates> {
    return this.destinationSubject.asObservable();
  }

  private notifyOriginChanges(): void {
    this.originSubject.next(this.origin);
  }

  private notifyDestinationChanges(): void {
    this.destinationSubject.next(this.destination);
  }

  /*private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }*/

}
