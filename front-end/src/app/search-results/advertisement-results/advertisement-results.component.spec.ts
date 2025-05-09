import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementResultsComponent } from './advertisement-results.component';

describe('AdvertisementResultsComponent', () => {
  let component: AdvertisementResultsComponent;
  let fixture: ComponentFixture<AdvertisementResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvertisementResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertisementResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
