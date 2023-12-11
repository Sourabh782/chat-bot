import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserMessageComponent } from '../user-message/user-message.component';
import { RepliesComponent } from '../replies/replies.component';
import { QuickActionComponent } from '../quick-action/quick-action.component';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule, UserMessageComponent, RepliesComponent, QuickActionComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {

  @ViewChild('endOfChat')
  endOfChat!: ElementRef;

  text: string = "";
  id: number = 0;

  @Input() receivedUserMessage(str: string){
    this.submitResponce(str);
  }

  quickActionHidden: boolean = false;

  btnHidden: boolean = false;

  toggleHidden = ()=>{
    this.btnHidden = !this.btnHidden;
  }

  initialMessage: string = `Hey! How can we help you? 😄
    Until one of our developers responds please check out our Helpdesk for more information regarding your questions. 
    We are a team based in Europe so it can take up to 24 hours until we get back to you depending on your timezone. 
    Cheers! `

  messages: Array<Array<string>> = [];
  replies: Array<string> = [];


  submitResponce = (str: string)=>{
    console.log(str)
    this.quickActionHidden = true;
    
    let msg: Array<string> = [];
    if(str.length != 0){
      msg.push(str);
      
      if(str == 'result'){
        msg.push("passed");
      } else if(str == 'Say Hello'){
        msg.push('Hello')
      } else {
        msg.push(str);
      }
      this.messages.push(msg);
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
    }, 50);
    setTimeout(()=>{
      if(this.endOfChat){
        this.endOfChat.nativeElement.scrollIntoView({behaviour: "smooth"});
      }
    }, 530);
  }
}
