import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
  standalone: false,
})
export class DateFieldComponent  implements OnInit {
  @Input() label!:  string;
  @Input() value: string = new Date().toISOString();
  @Output() onChange = new EventEmitter<string>();
  error!: string;

  constructor() { }

  ngOnInit() {}

  onDateChange(event : any){
    this.value = event.detail.value;
    this.onChange.emit(event.detail.value);
  }
}
