import { Router } from '@angular/router';
import { CommutesService } from './../../../shared/services/commutes.service';
import { Commute } from './../../../shared/models/commute.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-commute',
  templateUrl: './create-commute.component.html',
  styleUrls: ['./create-commute.component.css']
})
export class CreateCommuteComponent implements OnInit {

  commute: Commute = new Commute();

  constructor(
    private commutesService: CommutesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitCreateCommute(commuteForm: FormGroup) {
    console.log(commuteForm);
    if (commuteForm.valid) {
      console.log('COMMUTE', this.commute);
      this.commutesService.createCommute(this.commute)
        .subscribe(() => {
          commuteForm.reset();
          this.router.navigate(['/commutes', this.commute.id], );
        });
    }
  }

}
