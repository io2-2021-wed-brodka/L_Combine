import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechComponent } from './list-tech.component';

describe('ListTechComponent', () => {
  let component: ListTechComponent;
  let fixture: ComponentFixture<ListTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
