import { Commute } from 'src/app/shared/models/commute.model';
import { CommutesService } from './../../../shared/services/commutes.service';
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
  authUserCommutes: Commute[];
  userId: string;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private sessionService: SessionService,
    private commutesService: CommutesService
  ) { }

  ngOnInit() {
    this.authUserId = this.sessionService.user.id;
    this.userId = this.route.snapshot.params.userId;

    if (this.userId === this.authUserId) {
      this.commutesService.getUserCommutes()
        .subscribe((commutes: Commute[]) => this.authUserCommutes = commutes);
    }

    this.userService.getOne(this.userId)
      .subscribe((user: User) => this.user = user);
  }

  onSendMessage(userId: string) {
    this.router.navigate(['/users', this.authUserId, 'messages', userId ]);
  }

}
