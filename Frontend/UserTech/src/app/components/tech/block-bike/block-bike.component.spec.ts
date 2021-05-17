import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockBikeComponent } from './block-bike.component';

describe('BlockBikeComponent', () => {
  let component: BlockBikeComponent;
  let fixture: ComponentFixture<BlockBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockBikeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
