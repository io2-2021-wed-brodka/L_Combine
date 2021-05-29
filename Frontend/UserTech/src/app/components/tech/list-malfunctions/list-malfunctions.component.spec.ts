import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMalfunctionsComponent } from './list-malfunctions.component';

describe('ListMalfunctionsComponent', () => {
  let component: ListMalfunctionsComponent;
  let fixture: ComponentFixture<ListMalfunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMalfunctionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMalfunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
