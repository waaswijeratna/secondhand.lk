import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumGeneralDetailsComponent } from './forum-general-details.component';

describe('ForumGeneralDetailsComponent', () => {
  let component: ForumGeneralDetailsComponent;
  let fixture: ComponentFixture<ForumGeneralDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumGeneralDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumGeneralDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
