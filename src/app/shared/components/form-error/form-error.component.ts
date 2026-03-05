import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  standalone: false
})
export class FormErrorComponent  implements OnInit {
  @Input() control!: FormControl;
  @Input() label!: string;

  constructor() { }

  ngOnInit() {}

  get showError(): boolean {
    return this.control &&
            this.control.invalid &&
            (this.control.dirty || this.control.touched)

  }

  get errorKeys(): string[] {
    return this.control?.errors ? Object.keys(this.control.errors): []
  }

}
