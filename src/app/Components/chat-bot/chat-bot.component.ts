import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserMessageComponent } from '../user-message/user-message.component';
import { RepliesComponent } from '../replies/replies.component';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule, UserMessageComponent, RepliesComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {

  @ViewChild('endOfChat')
  endOfChat!: ElementRef;

  text: string = "";
  id: number = 0;

  initialMessage: string = `Hey! How can we help you? 😄
   Until one of our developers responds please check out our Helpdesk for more information regarding your questions. 
   We are a team based in Europe so it can take up to 24 hours until we get back to you depending on your timezone. 
   Cheers! `

  messages: Array<string> = [];

  submitResponce = (str: string)=>{
    console.log(str)
    if(str.length != 0){
      this.messages.push(str);
      this.id++;
      this.text = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom(){
    setTimeout(()=>{
      if(this.endOfChat){
        this.endOfChat.nativeElement.scrollIntoView({behaviour: "smooth"});
      }
    }, 100);
  }
}
