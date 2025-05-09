import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPlatformAndBotComponent } from './chat-platform-and-bot.component';

describe('ChatPlatformAndBotComponent', () => {
  let component: ChatPlatformAndBotComponent;
  let fixture: ComponentFixture<ChatPlatformAndBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatPlatformAndBotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatPlatformAndBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
