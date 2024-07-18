import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedebackComponent } from './feedeback.component';

describe('FeedebackComponent', () => {
  let component: FeedebackComponent;
  let fixture: ComponentFixture<FeedebackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedebackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
