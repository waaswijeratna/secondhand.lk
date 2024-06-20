import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlladviewComponent } from './alladview.component';

describe('AlladviewComponent', () => {
  let component: AlladviewComponent;
  let fixture: ComponentFixture<AlladviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlladviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlladviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
