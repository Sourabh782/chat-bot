import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  @Output() loggedInChange = new EventEmitter<boolean>();

  name: string = "";
  userName: string = "";
  password: string = "";
  loggedIn: boolean = false;

  passwordHidden: boolean = true;

  changePasswordVisibility = ()=>{
    this.passwordHidden = !this.passwordHidden;

    if(this.passwordHidden){
      // eye open = visible     eye close  = hidden
      document.getElementById("passwordS")?.setAttribute("type", "password");
      document.getElementById("closeS")?.classList.add("hidden");
      document.getElementById("openS")?.classList.remove("hidden");
    } else { // eye open = hidden   eye close = visible
      document.getElementById("passwordS")?.setAttribute("type", "text");
      document.getElementById("openS")?.classList.add("hidden");
      document.getElementById("closeS")?.classList.remove("hidden");
    }
  }


  submitDetails = (name: string, userName : string, password: string)=>{
    this.name = name;
    this.userName = userName;
    this.password = password;
    console.log("username : " + this.userName + " and password : " + this.password)
    this.loggedIn = !this.loggedIn;

    this.loggedInChange.emit();
  } 
}

