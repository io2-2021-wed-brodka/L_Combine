import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message, MessageType} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private count = 0;
  private subject = new Subject<Message>();

  constructor() {
  }

  notify(): Observable<Message> {
    return this.subject.asObservable();
  }

  error(message: string): void {
    this.subject.next({message, type: MessageType.Error, id: this.count++});
  }

  success(message: string): void {
    this.subject.next({message, type: MessageType.Success, id: this.count++});
  }
}
