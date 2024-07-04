import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAdFooterComponent } from './banner-ad-footer.component';

describe('BannerAdFooterComponent', () => {
  let component: BannerAdFooterComponent;
  let fixture: ComponentFixture<BannerAdFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerAdFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BannerAdFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
