import { SessionService } from './../../../shared/services/session.service';
import { ChatService } from './../../../shared/services/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chat } from 'src/app/shared/models/chat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {

  authUserId: string;
  messages: Chat[] = [];
  onMessagesChangesSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.authUserId = this.sessionService.user.id;
    this.chatService.listInbox(this.authUserId)
      .subscribe((messages: Chat[]) => {
        this.messages = messages;
      });
    this.onMessagesChangesSubscription = this.chatService.onChatChanges()
        .subscribe((messages: Chat[]) => this.messages = messages );

  }

  ngOnDestroy() {
    this.onMessagesChangesSubscription.unsubscribe();
  }

}
