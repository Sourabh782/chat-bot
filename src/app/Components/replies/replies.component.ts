import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-replies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './replies.component.html',
  styleUrl: './replies.component.css'
})
export class RepliesComponent {

  @Input() message:string = "";


  isHidden: boolean = true;

  setHidden = ()=>{
    setTimeout(() => {
      this.isHidden = false;
    }, 520);
  }  

  constructor(){
    this.setHidden();
  }
}
