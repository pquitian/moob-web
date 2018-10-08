import { ApiErrors } from './../../../shared/models/api-errors.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  
  user: User = new User();
  apiError: ApiErrors;

  constructor(private sessionService: SessionService, private router: Router) { }

  onSubmitLogIn(sessionForm: FormGroup): void {
    if (sessionForm.valid) {
      this.sessionService.authenticate(this.user)
        .subscribe(() => {
          sessionForm.reset();
          this.router.navigate(['search']);
        },
          (error: ApiErrors) => this.apiError
        );
    }
  }

}
