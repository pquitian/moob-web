import { UserService } from './../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  authUserId: string;
  userId: string;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService, 
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.authUserId = this.sessionService.user.id;
    this.userId = this.route.snapshot.params.userId;

    this.userService.getOne(this.userId)
      .subscribe((user: User) => this.user = user);
  }

  onSendMessage(userId: string) {
    this.router.navigate(['/users', this.authUserId, 'messages', userId ]);
  }

}
