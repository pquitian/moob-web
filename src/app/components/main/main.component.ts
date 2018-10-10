import { Commute } from './../../shared/models/commute.model';
import { SearcherService } from './../../shared/services/searcher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  commutes: Commute[] = [];

  constructor(private searcherService: SearcherService) { }

  ngOnInit() {
    this.searcherService.listAll().subscribe((commutes: Commute[]) => {
      this.commutes = commutes;
    });
  }

}
