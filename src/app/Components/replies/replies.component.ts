import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingAnimationComponent } from '../loading-animation/loading-animation.component';

@Component({
  selector: 'app-replies',
  standalone: true,
  imports: [CommonModule, LoadingAnimationComponent],
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
