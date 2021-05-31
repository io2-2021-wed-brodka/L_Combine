import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListMalfunctionsComponent} from './list-malfunctions.component';

describe('ListMalfunctionsComponent', () => {
  let component: ListMalfunctionsComponent;
  let fixture: ComponentFixture<ListMalfunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListMalfunctionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMalfunctionsComponent);
    component = fixture.componentInstance;
    component.malfunctions = [
      {
        id: 'id',
        bikeId: 'id',
        reportingUserId: 'id',
        description: 'a'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#selectMalfunction should set #selectedMalfunction', () => {
    expect(component.selectedMalfunction).toBeUndefined();
    component.selectMalfunction(component.malfunctions[0]);
    expect(component.selectedMalfunction).toEqual(component.malfunctions[0]);
  });
});
