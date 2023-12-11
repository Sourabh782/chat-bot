import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-quick-action',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './quick-action.component.html',
  styleUrl: './quick-action.component.css'
})


export class QuickActionComponent {
  quick_Action = document.getElementById("quickAction");
  courses: Array<string> = ["python", "c++", "c", "javascript", "java", "react"];
  
  @Input() hidden = false;
  @Output() messageEvent = new EventEmitter<string>();
  
  isHidden: boolean = false;
  cardHidden: boolean = true;

  clicked = (str: string)=>{
    this.isHidden = true;
    this.messageEvent.emit(str);

    if(str == ''){
      this.cardHidden = false;
    }
  }

}
