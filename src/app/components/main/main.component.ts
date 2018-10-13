import { Commute } from './../../shared/models/commute.model';
import { CommutesService } from './../../shared/services/commutes.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  commutes: Commute[] = [];
  onCommutesChangesSubscription: Subscription;

  constructor(private commutesService: CommutesService) { }

  ngOnInit() {
    this.commutesService.listAll()
      .subscribe((commutes: Commute[]) => {
      this.commutes = commutes;
    });
    this.onCommutesChangesSubscription = this.commutesService.onCommutesChanges()
      .subscribe((commutes: Commute[]) => this.commutes = commutes);
  }

  ngOnDestroy() {
    this.onCommutesChangesSubscription.unsubscribe();
  }

}
