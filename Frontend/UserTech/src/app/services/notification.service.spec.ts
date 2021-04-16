import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {MessageType} from '../models/message';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#success should create message with messageText', () => {
    const messageText = 'message';

    service.notify().subscribe(message =>
      expect(message.message).toEqual(messageText)
    );

    service.success(messageText);
  });

  it('#error should create message with messageText', () => {
    const messageText = 'message';

    service.notify().subscribe(message =>
      expect(message.message).toEqual(messageText)
    );

    service.error(messageText);
  });

  it('#success should create success message', () => {
    service.notify().subscribe(message =>
      expect(message.type).toEqual(MessageType.Success)
    );

    service.success('');
  });

  it('#error should create error message', () => {
    service.notify().subscribe(message =>
      expect(message.type).toEqual(MessageType.Error)
    );

    service.error('');
  });

  it('#success should create message with current time', () => {
    service.notify().subscribe(message => {
      expect(message.date).toEqual(new Date());
    });

    service.success('');
  });

  it('#error should create message with current time', () => {
    service.notify().subscribe(message => {
      expect(message.date).toEqual(new Date());
    });

    service.error('');
  });
});
