import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatServiceService } from '../../app-services/chat-service.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../app-services/localStorage';


interface Message {
  role: string;
  timeStamp: string;
  message: string;
}

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.scss']
})
export class UserChatComponent implements OnInit, OnDestroy {
  message = '';
  messages: Message[] = [];
  private userId = Number(this.localStorageService.getItem('userId')); ; // Replace with dynamic user ID if needed
  private userName = 'Akila Sanjeewa'; // Replace with dynamic user name if needed
  private subscription: Subscription | null = null;
userAvatar: any;
botAvatar: any;

  constructor(private chatService: ChatServiceService, private http: HttpClient, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.listenForMessages();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const newMessage: Message = this.createMessage(this.message, 'user');
      // this.addMessageToChat(newMessage);
      this.sendMessageToServer(newMessage);
      this.clearInputField();
    }
  }

  isSentByUser(message: Message): boolean {
    return message.role === 'user';
  }

  isAdminMessage(message: Message): boolean {
    return message.role === 'admin';
  }

  private listenForMessages(): void {
    this.subscription = this.chatService.receiveMessage().subscribe(
      (data: any) => {
        console.log("received", data);
        if (data.response && data.response.length > 0) {
          const chatRequest = data.response[0];
          if (chatRequest.userId === this.userId) {
            chatRequest.messages.forEach((msg: Message) => {
              this.addMessageToChat(msg);
            });
          }
        }
      },
      error => {
        console.error('Error receiving message:', error);
      }
    );
  }

  private unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private createMessage(text: string, role: string): Message {
    return {
      role: role,
      timeStamp: new Date().toISOString(),
      message: text
    };
  }

  private addMessageToChat(message: Message): void {
    this.messages.push(message);
  }

  private sendMessageToServer(message: Message): void {
    this.chatService.sendMessage(this.userId, message.message);
    
    // Send message to /chat endpoint
    this.http.post('http://localhost:3000/api/chat', {
      userId: this.userId,
      userName: this.userName,
      role: 'user',
      message: message.message
    }).subscribe(
      response => {
        console.log('Message sent to server:', response);
      },
      error => {
        console.error('Error sending message to server:', error);
      }
    );
  }

  private clearInputField(): void {
    this.message = '';
  }

  first(){
    this.userId=66;
  }
  second(){
    this.userId=66;
  }
}