import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumUniqueDetailsComponent } from './forum-unique-details.component';

describe('ForumUniqueDetailsComponent', () => {
  let component: ForumUniqueDetailsComponent;
  let fixture: ComponentFixture<ForumUniqueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumUniqueDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumUniqueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
