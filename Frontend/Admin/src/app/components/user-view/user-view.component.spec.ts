import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { UserViewComponent } from './user-view.component';

@Component({selector: 'app-list-users'})
class UserListComponentStub{}

@Component({selector: 'app-list-blocked-users'})
class BlockedUserListComponentStub{}

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], {url: 'p/users'})
    await TestBed.configureTestingModule({
      declarations: [ UserViewComponent, UserListComponentStub, BlockedUserListComponentStub ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: {
          parent: 'p'
        }}    
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('tech should be false on start', ()=>{
    expect(component.tech).toBeFalse();
  });
  
  it('#togglePage should toggle #tech value', ()=>{
    const initValue = component.tech;
    component.togglePage();
    expect(component.tech).toEqual(!initValue);
    component.togglePage();
    expect(component.tech).toEqual(initValue);
  })

  it('#togglePage should call #router.navigate', ()=>{
    expect(router.navigate).toHaveBeenCalledTimes(0);
    component.togglePage();
    expect(router.navigate).toHaveBeenCalledTimes(1);
  })
});
