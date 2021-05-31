import {ComponentFixture, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {MalfunctionService} from 'src/app/services/malfunction.service';

import {MalfunctionPanelComponent} from './malfunction-panel.component';

describe('MalfunctionPanelComponent', () => {
  let component: MalfunctionPanelComponent;
  let fixture: ComponentFixture<MalfunctionPanelComponent>;
  let malfunctionService: jasmine.SpyObj<MalfunctionService>;
  beforeEach(async () => {
    const malfunctionServiceSpy = jasmine.createSpyObj('MalfunctionService', ['getMalfunctions']);
    await TestBed.configureTestingModule({
      declarations: [MalfunctionPanelComponent],
      providers: [
        {provide: MalfunctionService, useValue: malfunctionServiceSpy}
      ]
    })
      .compileComponents();
    malfunctionService = TestBed.inject(MalfunctionService) as jasmine.SpyObj<MalfunctionService>;
    malfunctionService.getMalfunctions.and.returnValue(of({
      malfunctions: [
        {id: 'id', reportingUserId: 'id', bikeId: 'id', description: 'd'}
      ]
    }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunctionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getMalfunctions should call service function', () => {
    const timesOnInit = malfunctionService.getMalfunctions.calls.count();
    component.getMalfunctions();
    expect(malfunctionService.getMalfunctions).toHaveBeenCalledTimes(timesOnInit + 1);
    expect(component.malfunctions.length).toEqual(1);
  });

  it('should get malfunctions on init', () => {
    expect(component.malfunctions.length).toBeTruthy();
  });
});
