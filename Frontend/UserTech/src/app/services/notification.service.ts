import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message, MessageType} from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private subject = new Subject<Message>();

  constructor() {
  }

  notify(): Observable<Message> {
    return this.subject.asObservable();
  }

  error(message: string): void {
    this.subject.next({message, type: MessageType.Error, date: new Date()});
  }

  success(message: string): void {
    this.subject.next({message, type: MessageType.Success, date: new Date()});
  }
}
