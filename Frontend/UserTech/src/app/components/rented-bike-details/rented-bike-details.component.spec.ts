import {ComponentFixture, TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BikeState } from 'src/app/models/bike';
import { RouterLinkDirectiveStub } from 'src/app/testing/RouterLinkDirectiveStub';

import {RentedBikeDetailsComponent} from './rented-bike-details.component';

describe('ReturnBikeComponent', () => {
  let component: RentedBikeDetailsComponent;
  let fixture: ComponentFixture<RentedBikeDetailsComponent>;
  let routerLink: RouterLinkDirectiveStub;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentedBikeDetailsComponent, RouterLinkDirectiveStub ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedBikeDetailsComponent);
    component = fixture.componentInstance;
    component.bike = {id: 'id', state: BikeState.Rented};
    routerLink = fixture.debugElement
        .query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect on button click', ()=>{
    expect(routerLink.navigatedTo).toBeFalsy()
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(routerLink.navigatedTo).toBeTruthy()
  });

  it('should redirect with id as param', ()=>{
    expect(routerLink.linkParams[1]).toEqual(component.bike.id);
  });
  
  it('should redirect to return view', ()=>{
    expect(routerLink.linkParams[0]).toEqual('../return');
  });
});
