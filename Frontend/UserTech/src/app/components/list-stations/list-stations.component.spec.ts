import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StationState } from 'src/app/models/bikeStation';
import { StationService } from 'src/app/services/station.service';
import mockStationService from 'src/app/testing/mock-services/mockStationService';
import { RouterLinkDirectiveStub } from 'src/app/testing/RouterLinkDirectiveStub';

import { ListStationsComponent } from './list-stations.component';

describe('ListStationsComponent', () => {
  let component: ListStationsComponent;
  let fixture: ComponentFixture<ListStationsComponent>;
  let routerLinks: RouterLinkDirectiveStub[];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStationsComponent, RouterLinkDirectiveStub ],
      providers: [
          {provide: StationService, useValue: mockStationService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerLinks = fixture.debugElement
      .queryAll(By.directive(RouterLinkDirectiveStub))
      .map(de => de.injector.get(RouterLinkDirectiveStub));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#stations should be defined on init', ()=>{
      expect(component.stations.length).toBeTruthy();
  });

  it('should navigate with correct id parameter',()=>{
    expect(routerLinks[0].navigatedTo).toBeNull();
    fixture.debugElement
      .queryAll(By.css('a'))[0]
      .triggerEventHandler('click', null);
    expect(routerLinks[0].navigatedTo[0]).toEqual('../station');
    expect(routerLinks[0].navigatedTo[1]).toEqual(component.stations[0].id);
  });
  
  it('should be disabled if station is blocked',()=>{
    component.stations[0].stationState = StationState.Active;
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css('a'));
    expect(link.classes['list-item-blocked']).toBeFalsy();
    component.stations[0].stationState = StationState.Blocked;
    fixture.detectChanges();
    expect(link.classes['list-item-blocked']).toBeTrue();
  });

  it('should inform station is active',()=>{
    component.stations[0].stationState = StationState.Active;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.list-item-side-right > span'));
    expect(span.nativeElement.textContent).toContain('Aktywna');
  });

  it('should inform station is blocked',()=>{
    component.stations[0].stationState = StationState.Blocked;
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.list-item-side-right > span'));
    expect(span.nativeElement.textContent).toContain('Zablokowana');
  });

  it('should show location name', ()=>{
    const div = fixture.debugElement.query(By.css('.list-item-side-left'));
    expect(div.nativeElement.textContent).toContain(component.stations[0].locationName);

  });
});
