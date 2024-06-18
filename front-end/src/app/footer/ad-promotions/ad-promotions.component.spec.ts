import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdPromotionsComponent } from './ad-promotions.component';

describe('AdPromotionsComponent', () => {
  let component: AdPromotionsComponent;
  let fixture: ComponentFixture<AdPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdPromotionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
