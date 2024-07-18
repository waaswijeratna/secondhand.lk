import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsAndReportingComponent } from './ratings-and-reporting.component';

describe('RatingsAndReportingComponent', () => {
  let component: RatingsAndReportingComponent;
  let fixture: ComponentFixture<RatingsAndReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingsAndReportingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatingsAndReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
