import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TechService } from 'src/app/services/tech.service';

import { ListTechComponent } from './list-tech.component';

describe('ListTechComponent', () => {
  let component: ListTechComponent;
  let fixture: ComponentFixture<ListTechComponent>;
  let techService: jasmine.SpyObj<TechService>;
  beforeEach(async () => {
    const techServiceSpy = jasmine.createSpyObj('TechService', ['getTechs']);
    await TestBed.configureTestingModule({
      declarations: [ ListTechComponent ],
      providers: [
        {provide: TechService, useValue: techServiceSpy}
      ]
    })
    .compileComponents();
    techService = TestBed.inject(TechService) as jasmine.SpyObj<TechService>;
    techService.getTechs.and.returnValue(of({techs: [{name: 'name', id: '1'}]}))
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('#isFormVisible should by false on init', ()=>{
    expect(component.isFormVisible).toBeFalse();
  });
  it('#toggleForm should toggle #isFormVisible', ()=>{
    const initValue = component.isFormVisible;
    component.toggleForm();
    expect(component.isFormVisible).toEqual(!initValue);
    component.toggleForm();
    expect(component.isFormVisible).toEqual(initValue);
  });
  it('#techs should be defined on init', ()=>{
    expect(techService.getTechs).toHaveBeenCalledTimes(1);
    expect(component.techs.length).toBeTruthy();
  });
  it('#selectTech should set #selectedTech', ()=>{
    expect(component.selectedTech).toBeUndefined();
    component.selectTech(component.techs[0]);
    expect(component.selectedTech).toEqual(component.techs[0]);
  });
});
