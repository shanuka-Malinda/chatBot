import { Component } from '@angular/core';
import { ChatBotService } from '../service/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent {
  userInput: string = '';
  messages: { text: string, user: boolean }[] = [];
  isDataLoaded: boolean = false;

  constructor(private chatService: ChatBotService) {}

  ngOnInit() {
    this.chatService.loadChatData().subscribe(() => {
      this.isDataLoaded = true;
    });
  }

  sendMessage() {
    if (this.userInput.trim() !== '' && this.isDataLoaded) {
      this.messages.push({ text: this.userInput, user: true });
      const botResponse = this.chatService.getResponse(this.userInput);
      this.messages.push({ text: botResponse, user: false });
      this.userInput = '';
    } else if (!this.isDataLoaded) {
      this.messages.push({ text: "Data is still loading. Please wait.", user: false });
    }
  }
}
