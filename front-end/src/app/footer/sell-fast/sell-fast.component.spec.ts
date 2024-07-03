import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellFastComponent } from './sell-fast.component';

describe('SellFastComponent', () => {
  let component: SellFastComponent;
  let fixture: ComponentFixture<SellFastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellFastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellFastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
