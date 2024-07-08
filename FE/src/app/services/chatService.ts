import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private userIds: number[] = [];

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:8000');
    this.fetchUserIds();
  }

  private fetchUserIds(): void {
    this.http.get<number[]>('http://localhost:8000/getUserId').subscribe(
      (userIds) => {
        this.userIds = userIds;
        this.joinChatRooms();
      },
      (error) => {
        console.error('Error fetching user IDs:', error);
      }
    );
  }

  private joinChatRooms(): void {
    this.userIds.forEach(userId => {
      console.log(userId)
      this.socket.emit('joinChatRoom', userId);
    });
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

  // New method to get all user IDs
  getUserIds(): number[] {
    return this.userIds;
  }
}