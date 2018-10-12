import { CommutesService } from './../../../shared/services/commutes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  constructor(private commutesService: CommutesService) { }

  ngOnInit() {
  }

}
