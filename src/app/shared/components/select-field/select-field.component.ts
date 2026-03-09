import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
  standalone: false,
})
export class SelectFieldComponent  implements OnInit {
  @Input() label!: string;
  @Input() options!: any[];
  @Input() value!: any;
  @Input() error!: string;
  @Output() onChange = new EventEmitter<any>();

  constructor() { }

  async ngOnInit() {
  }

  customModalOptions = {
    header: 'Selecciona',
  }

  onCategoryChange(event : any){
    this.value = event.detail.value;
    this.onChange.emit(this.value);
  }

}
