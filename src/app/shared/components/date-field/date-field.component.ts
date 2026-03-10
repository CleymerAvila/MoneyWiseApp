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
  minDate!: string;
  maxDate!: string;
  @Output() onChange = new EventEmitter<string>();
  error!: string;

  constructor() {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    const twoYearAgo = new Date();
    twoYearAgo.setFullYear(today.getFullYear() - 2);
    this.minDate = twoYearAgo.toISOString().split('T')[0];
  }

  ngOnInit() {}

  onDateChange(event : any){
    this.value = event.detail.value;
    this.onChange.emit(event.detail.value);
  }
}
