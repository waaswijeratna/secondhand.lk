import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../app-services/localStorage';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket: Socket;
  private userId: number;

  constructor(private localStorageService: LocalStorageService) {
    this.socket = io('http://localhost:3000');
    this.userId = Number(this.localStorageService.getItem('userId')); 
    this.socket.emit('joinChatRoom', this.userId);
  }

  sendMessage(userId: number, message: string): void {
    this.socket.emit('sendMessage', { userId, message });
  }

  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('chatStarted', (data) => {
        observer.next(data);
      });
    });
  }

}
