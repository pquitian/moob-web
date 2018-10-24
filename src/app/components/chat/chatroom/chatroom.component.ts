import { UserService, UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { Chat } from 'src/app/shared/models/chat.model';
import { ChatService } from './../../../shared/services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, OnDestroy {

  private static readonly POLLING = 1000;

  authUserId: string;
  messages: Chat[] = [];
  onMessagesChangesSubscription: Subscription;
  message: Chat = new Chat();
  receiver: User = new User();

  constructor(
    private chatService: ChatService,
    private sessionService: SessionService,
    private router: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userId = this.router.snapshot.params.userId;

    this.authUserId = this.sessionService.user.id;

    this.message.from = this.authUserId;
    this.message.to = userId;
    this.userService.getOne(userId).subscribe(
      (user: User) => this.receiver = user
    );


    this.chatService.getChatMessages(userId)
      .subscribe((messages: Chat[]) => {
        this.messages = messages;
      });

    this.onMessagesChangesSubscription = interval(ChatroomComponent.POLLING)
    .pipe(
      switchMap(() => this.chatService.getChatMessages(userId))
    )
    .subscribe((messages: Chat[]) => {
      this.messages = messages;
    } );

  }

  ngOnDestroy() {
    this.onMessagesChangesSubscription.unsubscribe();
  }

  onSubmitSendMessage(messageForm: FormGroup): void {
    this.message.message = messageForm.value.message;
    this.chatService.createNewMessage(this.message).subscribe(() => {
      messageForm.reset();
    });
  }

}
