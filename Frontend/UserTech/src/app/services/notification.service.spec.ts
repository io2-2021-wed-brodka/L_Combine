import {TestBed} from '@angular/core/testing';

import {NotificationService} from './notification.service';
import {MessageType} from '../models/message';
import {skip} from 'rxjs/operators';

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

  it('#success should create error message', () => {
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

  it('id should increase', () => {
    service.notify().pipe(skip(1)).subscribe(message => {
      expect(message.id).toEqual(1);
    });

    service.error('');
    service.error('');
  });
});
