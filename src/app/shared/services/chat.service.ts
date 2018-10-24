import { Subject, Observable } from 'rxjs';
import { SessionService } from './session.service';
import { ApiErrors } from './../models/api-errors.model';
import { Chat } from './../models/chat.model';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseApiService {

  private static readonly API_CHAT = `${BaseApiService.BASE_API}/users`;
  private static readonly MESSAGE_PATH = 'messages';

  private messages: Chat[] = [];
  private message: Chat = new Chat();
  private messagesSubject: Subject<Array<Chat>> = new Subject();


  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    super();
  }

  createNewMessage(message: Chat): Observable <Chat | ApiErrors> {
    return this.http.post<Chat>(`${ChatService.API_CHAT}/${this.sessionService.user.id}/${ChatService.MESSAGE_PATH}/${message.to}/create`,
    message,
    BaseApiService.defaultOptions)
    .pipe(
      map((chat: Chat) => {
        chat = Object.assign(new Chat(), chat);
        this.messages.push(chat);
        this.notifyChatChanges();
        return chat;
      }),
      catchError(this.handleError)
    );
  }

  listInbox(authUserId: string): Observable <Chat[] | ApiErrors> {
    return this.http.get<void>(`${ChatService.API_CHAT}/${authUserId}/${ChatService.MESSAGE_PATH}/`, BaseApiService.defaultOptions)
      .pipe(
        map((messages: Chat[]) => {
          messages = messages.map(message => Object.assign(new Chat(), message));
          this.messages = messages;
          this.notifyChatChanges();
          return messages;
        }),
        catchError(this.handleError)
      );
  }

  getChatMessages(userId: string): Observable <Chat[] | ApiErrors> {
    return this.http.get<Chat>(`${ChatService.API_CHAT}/${this.sessionService.user.id}/${ChatService.MESSAGE_PATH}/${userId}`,
     BaseApiService.defaultOptions)
      .pipe(
        map((messages: Chat[]) => {
          messages = messages.map(message => Object.assign(new Chat(), message));
          this.messages = messages;
          this.notifyChatChanges();
          return messages;
        }),
        catchError(this.handleError)
      );
  }

  onChatChanges(): Observable<Chat[]> {
    return this.messagesSubject.asObservable();
  }

  private notifyChatChanges(): void {
    this.messagesSubject.next(this.messages);
  }
}
