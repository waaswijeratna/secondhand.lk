import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaySafeComponent } from './stay-safe.component';

describe('StaySafeComponent', () => {
  let component: StaySafeComponent;
  let fixture: ComponentFixture<StaySafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaySafeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaySafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
