import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import { UserMessageComponent } from '../user-message/user-message.component';
import { RepliesComponent } from '../replies/replies.component';
import { QuickActionComponent } from '../quick-action/quick-action.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import axios from 'axios';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule, UserMessageComponent, RepliesComponent, QuickActionComponent, LoginComponent, SignupComponent],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})

export class ChatBotComponent {

  @ViewChild('endOfChat')
  endOfChat!: ElementRef;

  text: string = "";
  id: number = 0;
  name1: string = "";

  @Input() receivedUserMessage(str: string){
    this.submitResponce(str);
  }

  username: string = ""

  quickActionHidden: boolean = false;

  btnHidden: boolean = false;

  loggedIn: boolean = false;

  loginActive: boolean = false;
  signupActive: boolean = true;



  setLoginActive = ()=>{
    this.loginActive = true;
    this.signupActive = false;
  }
  setSignupActive = ()=>{
    this.loginActive = false;
    this.signupActive = true;
  }

  toggleHidden = ()=>{
    this.btnHidden = !this.btnHidden;
  }

  initialMessage: string = ""

  messages: Array<Array<string>> = [];
  replies: Array<string> = [];



  submitResponce = async (str: string)=>{
    
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

      await axios.put(`http://localhost:8000/api/message/append/${this.username}`,{
        data: [msg[0], msg[1]]
      })
    }

  }

  
  loggedInCng = async ( username: string )=>{
    
    this.initialMessage = `Hey ${username}!! How can we help you? 😄
    Until one of our developers responds please check out our Helpdesk for more information regarding your questions. 
    We are a team based in Europe so it can take up to 24 hours until we get back to you depending on your timezone. 
    Cheers! `

    this.username = username;
    
    const data = await axios.get(`http://localhost:8000/api/message/${username}`).then(res=>res.data)
    console.log(data)
    
    for(let i=0; i < data.sent.length; i++){
      this.quickActionHidden = true
      let msg: Array<string> = [];
      msg.push(data.sent[i][0]);
      msg.push(data.sent[i][1]);
      this.messages.push(msg);
    }
    
    setTimeout(() => {
      this.loggedIn = !this.loggedIn;
      this.scrollToBottom()
    }, 550);
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
