import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../services/chatService';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface Message {
  role: string;
  timeStamp: string;
  message: string;
}

interface ChatRequest {
  updatedTime: string;
  userId: number;
  userName: string;
  messages: Message[];
}

interface ChatPayload {
  userName: string;
  userId: number;
  role: string;
  message: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  chatRequests: ChatRequest[] = [];
  selectedUser: ChatRequest | null = null;
  displayMessages: { text: string; role: string; time: string; isAdmin: boolean }[] = [];
  private subscription: Subscription | null = null;

  constructor(
    private chatService: ChatService,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.fetchAllChatData();
    this.subscription = this.chatService.receiveMessage().subscribe((data: { response: ChatRequest[] }) => {
      const newRequest = data.response[0];
      const existingRequestIndex = this.chatRequests.findIndex(req => req.userId === newRequest.userId);
      if (existingRequestIndex !== -1) {
        const newMessages = newRequest.messages.filter(newMsg =>
          !this.chatRequests[existingRequestIndex].messages.some(existingMsg =>
            existingMsg.timeStamp === newMsg.timeStamp && existingMsg.message === newMsg.message
          )
        );
        this.chatRequests[existingRequestIndex].messages.push(...newMessages);
      } else {
        this.chatRequests.push(newRequest);
      }
      if (this.selectedUser && this.selectedUser.userId === newRequest.userId) {
        //this.updateDisplayMessages();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchAllChatData() {
    this.http.get<ChatRequest[]>('http://localhost:8000/getAllChat').subscribe(
      (data) => {
        this.chatRequests = data;
        this.chatRequests.sort((a, b) => new Date(b.updatedTime).getTime() - new Date(a.updatedTime).getTime());
      },
      (error) => {
        console.error('Error fetching chat data:', error);
      }
    );
  }

  sendMessage(): void {
    if (this.message.trim() && this.selectedUser) {
      const newMessage: Message = {
        role: 'admin',
        timeStamp: new Date().toISOString(),
        message: this.message
      };
      this.selectedUser.messages.push(newMessage);
      this.sendPayloadToServer();
      this.updateDisplayMessages();
    }
  }

  sendPayloadToServer(): void {
    if (this.selectedUser) {
      const payload: ChatPayload = {
        userName: 'Admin',
        userId: this.selectedUser.userId,
        role: 'admin',
        message: this.message
      };
      this.http.post('http://localhost:8000/chat', payload).subscribe(
        response => {
          console.log('Message sent successfully:', response);
          this.message = '';
        },
        error => {
          console.error('Error sending message:', error);
        }
      );
    }
  }

  selectUser(user: ChatRequest): void {
    this.selectedUser = user;
    this.updateDisplayMessages();
  }

  private updateDisplayMessages(): void {
    if (this.selectedUser) {
      this.displayMessages = this.selectedUser.messages.map(msg => ({
        text: msg.message,
        role: msg.role,
        time: this.datePipe.transform(new Date(msg.timeStamp), 'hh:mm a') || '',
        isAdmin: msg.role === 'admin'
      }));
    } else {
      this.displayMessages = [];
    }
  }

  isAdminMessage(message: { text: string; role: string; time: string; isAdmin: boolean }): boolean {
    return message.isAdmin;
  }

  getLastMessage(user: ChatRequest): string {
    const lastMessage = user.messages[user.messages.length - 1];
    return lastMessage ? lastMessage.message : '';
  }
}