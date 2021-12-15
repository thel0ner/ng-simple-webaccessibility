import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSimpleWebaccessibilityComponent } from './ng-simple-webaccessibility.component';
import { NgSimpleWebaccessibilityService } from './ng-simple-webaccessibility.service';

describe('NgSimpleWebaccessibilityComponent', () => {
  let component: NgSimpleWebaccessibilityComponent;
  let fixture: ComponentFixture<NgSimpleWebaccessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgSimpleWebaccessibilityComponent],
      providers: [NgSimpleWebaccessibilityService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSimpleWebaccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
