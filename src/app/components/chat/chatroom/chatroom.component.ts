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

  private static readonly POLLING = 5000;

  authUserId: string;
  messages: Chat[] = [];
  onMessagesChangesSubscription: Subscription;
  message: Chat = new Chat();

  constructor(
    private chatService: ChatService,
    private sessionService: SessionService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    const userId = this.router.snapshot.params.userId;

    this.authUserId = this.sessionService.user.id;

    this.message.from = this.authUserId;
    this.message.to = userId;


    this.chatService.getChatMessages(userId)
      .subscribe((messages: Chat[]) => {
        this.messages = messages;
      });

    this.onMessagesChangesSubscription = interval(1000)
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
    console.log(messageForm);
    //const userId = this.router.snapshot.params.userId;
    //const message = {'message': messageForm.form.value.message};
    this.message.message = messageForm.form.value.message;
    this.chatService.createNewMessage(this.message);
    messageForm.reset();
  }

}
