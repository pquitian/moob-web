import { FilterCriteria } from './../../shared/models/filter-criteria.model';
import { SearcherComponent } from './../search/searcher/searcher.component';
import { Commute } from './../../shared/models/commute.model';
import { CommutesService } from './../../shared/services/commutes.service';
import { Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  commutes: Commute[] = [];
  onCommutesChangesSubscription: Subscription;
  zeroResults: boolean = false;

  criteria: FilterCriteria = new FilterCriteria();

  @ViewChild(SearcherComponent) searcherComponent: SearcherComponent;

  constructor(private commutesService: CommutesService) { }

  ngOnInit() {
    this.commutes = this.commutesService.commutes;
    this.onCommutesChangesSubscription = this.commutesService.onCommutesChanges()
      .subscribe((commutes: Commute[]) => this.commutes = commutes);
  }

  ngOnDestroy() {
    this.onCommutesChangesSubscription.unsubscribe();
  }

  onSearchFormChanges(criteria: FilterCriteria) {
    if (criteria.origin_lat && criteria.dest_lng && criteria.date_from) {
      this.commutesService.filter(criteria)
        .subscribe((commutes: Commute[]) => {
          if (commutes.length > 0) {
            this.commutes = commutes;
          } else {
            this.zeroResults = true;
          }
        });

    }
  }


}
