import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  @Output() loggedInChange = new EventEmitter<string>();

  loggedIn: boolean = false;

  obj = {
    name: '',
    username: '',
    password: ''
  }

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

  submitDetails = async (name: string, userName : string, password: string)=>{
    this.loggedIn = !this.loggedIn;

    this.obj = await axios.post('http://localhost:8000/api/user/',{
      'name': name, 'username': userName, 'password': password
    }).then(res=>{
      return res.data
    })

    this.loggedInChange.emit(this.obj.name);
  } 
}

