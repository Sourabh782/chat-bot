import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  @Output() loggedInChange = new EventEmitter<string>();
  
  loggedIn: boolean = false;
  
  obj = {
    name: '', 
    username : '',
    password: ''
  };

  incorrectPassword: boolean = false;
  incorrectUserName: boolean = false;

  passwordHidden: boolean = true;

  changePasswordVisibility = ()=>{
    console.log()
    this.passwordHidden = !this.passwordHidden;

    if(this.passwordHidden){
      // eye open = visible     eye close  = hidden
      document.getElementById("passwordL")?.setAttribute("type", "password");
      document.getElementById("close")?.classList.add("hidden");
      document.getElementById("open")?.classList.remove("hidden");
    } else { // eye open = hidden   eye close = visible
      document.getElementById("passwordL")?.setAttribute("type", "text");
      document.getElementById("open")?.classList.add("hidden");
      document.getElementById("close")?.classList.remove("hidden");
    }
  }

  submitDetails = async (userName : string, password: string)=>{
    
    this.incorrectUserName = false;

    try {
      await axios.get(`http://localhost:8000/api/user/${userName}`)

      try{
        await axios.get(`http://localhost:8000/api/user/${userName}/${password}`)
        this.loggedIn = !this.loggedIn;
        this.loggedInChange.emit(userName);
      } catch (e) {
        this.incorrectPassword = true;
      }
    } catch (e) { 
      this.incorrectUserName = true;
    }

  }
}
