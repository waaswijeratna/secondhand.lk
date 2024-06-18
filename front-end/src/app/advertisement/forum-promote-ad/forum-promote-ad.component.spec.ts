import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPromoteAdComponent } from './forum-promote-ad.component';

describe('ForumPromoteAdComponent', () => {
  let component: ForumPromoteAdComponent;
  let fixture: ComponentFixture<ForumPromoteAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumPromoteAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumPromoteAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
