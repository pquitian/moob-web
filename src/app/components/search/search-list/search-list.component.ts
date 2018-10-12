import { CommutesService } from './../../../shared/services/commutes.service';
import { Router } from '@angular/router';
import { Commute } from './../../../shared/models/commute.model';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  @Input() commute: Commute = new Commute();

  constructor(private router: Router, private commutesService: CommutesService) { }

  ngOnInit() {
  }

  openDetail(id: string): void {
    this.router.navigate(['/commute', id]);
  }

  addPassenger(): void {
    //console.log(this.commute.id)
    this.commutesService.addPassenger(this.commute.id);
  }

}
