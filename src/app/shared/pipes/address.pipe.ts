import { GeoService } from './../services/geo.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  constructor(private geoService: GeoService) {}

  transform(coords: number[]): Promise<string> {
    if (!coords) {
      return null;
    } else {
      return this.geoService.getAddress(coords).then((coordinates) => {
        return coordinates;
      });
    }
  }
}
