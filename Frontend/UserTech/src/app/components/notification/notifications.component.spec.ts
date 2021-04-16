import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NotificationsComponent} from './notifications.component';
import {NotificationService} from '../../services/notification.service';
import {of} from 'rxjs';
import {MessageType} from '../../models/message';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {NOTIFICATION_TIMEOUT} from '../../constants/notifications';

describe('NotificationComponent', () => {
  let component: NotificationsComponent;
  let debugElement: DebugElement;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let fixture: ComponentFixture<NotificationsComponent>;

  const message = {type: MessageType.Success, message: 'aaa', date: new Date()};

  beforeEach(async () => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['notify']);

    await TestBed.configureTestingModule({
      declarations: [NotificationsComponent],
      providers: [
        {
          provide: NotificationService,
          useValue: notificationServiceSpy
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    notificationService.notify.and.returnValue(of(message));

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call #notify on init', () => {
    fixture.detectChanges();
    expect(notificationService.notify).toHaveBeenCalledOnceWith();
  });

  it('should add messages to array on notification', () => {
    expect(component.messages.length).toEqual(0);

    fixture.detectChanges();
    expect(component.messages.length).toEqual(1);
  });

  it('should delete message after NOTIFICATION_TIMEOUT ms', fakeAsync(() => {
    fixture.detectChanges();
    expect(component.messages.length).toEqual(1);

    tick(NOTIFICATION_TIMEOUT);

    fixture.detectChanges();
    expect(component.messages.length).toEqual(0);
  }));

  it('#remove should remove message from array', () => {
    component.messages.push(message);
    expect(component.messages.length).toEqual(1);

    component.remove(message);
    expect(component.messages.length).toEqual(0);
  });

  it('#remove should skip message that is not in array', () => {
    component.messages.push(message);
    expect(component.messages.length).toEqual(1);

    component.remove({...message, type: MessageType.Error});
    expect(component.messages.length).toEqual(1);
  });

  it('should display all messages', () => {
    component.messages.push(message);

    fixture.detectChanges();
    expect(debugElement.queryAll(By.css('.message')).length).toEqual(2);
  });

  it('should display message with text and close button', () => {
    fixture.detectChanges();
    expect(debugElement.query(By.css('.message')).children[0].nativeElement.textContent).toEqual(message.message);
    expect(debugElement.query(By.css('.message')).children[1].nativeElement.textContent).toEqual('x');
  });

  it('should call #remove when clicking close button', () => {
    fixture.detectChanges();
    debugElement.query(By.css('.message-close')).triggerEventHandler('click', null);
    expect(component.messages.length).toEqual(0);
  });

  it('should display success message with correct class', () => {
    notificationService.notify.and.returnValue(of());
    component.messages.push(message);

    fixture.detectChanges();
    expect(debugElement.query(By.css('.message')).classes['message-success']).toBeTrue();
  });

  it('should display error message with correct class', () => {
    notificationService.notify.and.returnValue(of());
    component.messages.push({...message, type: MessageType.Error});

    fixture.detectChanges();
    expect(debugElement.query(By.css('.message')).classes['message-error']).toBeTrue();
  });
});
