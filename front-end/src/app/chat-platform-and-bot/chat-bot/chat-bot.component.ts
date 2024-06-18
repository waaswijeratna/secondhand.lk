import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  messages: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.addMessage("Hello! I'll be happy to assist you today. How may I assist you?", false, [
      { text: 'ad posting related', key: 'option1' },
      { text: 'ad promoting related', key: 'option2' }
    ]);
  }

  onOptionSelected(option: any) {
    // Add the user's selection to the messages array
    this.addMessage(option.text, true);

    // Send the selected option to the backend
    this.http.post<{ response: any }>('http://localhost:3000/api/chatBot', { option: option.key }).subscribe(
      res => {
        const response = res.response;
        if (Array.isArray(response)) {
          this.addMessage("Please choose one of the following options:", false, response);
        } else {
          this.addMessage(response, false);
        }
      },
      err => {
        console.error('Error:', err);
      });
  }

  addMessage(text: string, reply: boolean, options: any[] = []) {
    const date = new Date();
    this.messages.push({ text, reply, options, date });
  }
}
