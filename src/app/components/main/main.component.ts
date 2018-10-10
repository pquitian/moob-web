import { Commute } from './../../shared/models/commute.model';
import { SearcherService } from './../../shared/services/searcher.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  commutes: Commute[] = [];
  onCommutesChangesSubscription: Subscription;

  constructor(private searcherService: SearcherService) { }

  ngOnInit() {
    this.searcherService.listAll().subscribe((commutes: Commute[]) => {
      this.commutes = commutes;
    });
    this.onCommutesChangesSubscription = this.searcherService.onCommutesChanges()
      .subscribe((commutes: Commute[]) => this.commutes = commutes);
  }

  ngOnDestroy() {
    this.onCommutesChangesSubscription.unsubscribe();
  }

}
