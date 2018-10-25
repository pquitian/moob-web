import { ApiErrors } from './../../../shared/models/api-errors.model';
import { Component } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { FormGroup } from '@angular/forms';
import { User } from '../../../shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  apiError: ApiErrors;
  user: User = new User();
  ApiErrors: ApiErrors;

  constructor(private userService: UserService, private router: Router) { }

  onSubmitSignUp(signupForm: FormGroup): void {
    if (signupForm.valid) {
      this.userService.create(this.user)
        .subscribe(()=> {
          signupForm.reset();
          this.router.navigate(['/login']);
        }, (error: ApiErrors) => this.apiError = error
      );
    }

  }

}
