import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCategorySelectionComponent } from './forum-category-selection.component';

describe('ForumCategorySelectionComponent', () => {
  let component: ForumCategorySelectionComponent;
  let fixture: ComponentFixture<ForumCategorySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumCategorySelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumCategorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
