import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { RedirectService } from 'src/app/services/redirect.service';
import { TechService } from 'src/app/services/tech.service';

import { DeleteTechComponent } from './delete-tech.component';

describe('DeleteTechComponent', () => {
  let component: DeleteTechComponent;
  let fixture: ComponentFixture<DeleteTechComponent>;
  let techService: jasmine.SpyObj<TechService>;
  let redirectService: jasmine.SpyObj<RedirectService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const techServiceSpy = jasmine.createSpyObj('TechService', ['deleteTech']);
    const redirectServiceSpy = jasmine.createSpyObj('RedirectService', ['reload']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['success']);
    
    await TestBed.configureTestingModule({
      declarations: [ DeleteTechComponent ],
      providers: [
        {provide: TechService, useValue: techServiceSpy},
        {provide: RedirectService, useValue: redirectServiceSpy},
        {provide: NotificationService, useValue: notificationServiceSpy},
      ]
    })
    .compileComponents();;
    techService = TestBed.inject(TechService) as jasmine.SpyObj<TechService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    redirectService = TestBed.inject(RedirectService) as jasmine.SpyObj<RedirectService>;
    techService.deleteTech.and.returnValue(of({}));
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTechComponent);
    component = fixture.componentInstance;
    component.tech = {id: 'id', username: 'userName'}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#deleteTech should call service function', ()=>{
    expect(techService.deleteTech).toHaveBeenCalledTimes(0);
    component.deleteTech();
    expect(techService.deleteTech).toHaveBeenCalledWith(component.tech.id);
  });
  it('#deleteTech should send notification', ()=>{
    expect(notificationService.success).toHaveBeenCalledTimes(0);
    component.deleteTech();
    expect(notificationService.success).toHaveBeenCalledTimes(1);
  });
});
