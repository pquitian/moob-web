import { SearcherService } from './../../../shared/services/searcher.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  constructor(private searcherService: SearcherService) { }

  ngOnInit() {
  }

}
