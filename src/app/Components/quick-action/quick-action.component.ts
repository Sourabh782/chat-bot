import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-action',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quick-action.component.html',
  styleUrl: './quick-action.component.css'
})


export class QuickActionComponent {
  quick_Action = document.getElementById("quickAction");

  @Input() hidden = false;
  @Output() messageEvent = new EventEmitter<string>();
  
  isHidden: boolean = false;

  clicked = (str: string)=>{
    this.isHidden = true;
    this.messageEvent.emit(str);
  }

}
