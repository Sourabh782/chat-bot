import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  @Output() loggedInChange = new EventEmitter<boolean>();
  
  userName: string = "";
  password: string = "";
  loggedIn: boolean = false;

  passwordHidden: boolean = true;

  changePasswordVisibility = ()=>{
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

  submitDetails = (userName : string, password: string)=>{
    this.userName = userName;
    this.password = password;
    console.log("username : " + this.userName + " and password : " + this.password)
    this.loggedIn = !this.loggedIn;

    this.loggedInChange.emit();
  }
}
