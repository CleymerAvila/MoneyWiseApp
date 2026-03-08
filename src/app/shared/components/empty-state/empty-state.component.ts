import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false,
})
export class EmptyStateComponent  implements OnInit {
  @Input() message!: string;
  @Input() iconName!: string;
  @Input() action!: string;
  @Output() onAction = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onActionClicked(){
    this.onAction.emit(this.action);
  }

}
