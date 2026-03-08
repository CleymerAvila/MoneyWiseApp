import { Component, forwardRef, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ]
})
export class FormInputComponent  implements ControlValueAccessor {
  @Input() label!: string;
  @Input({required: true}) type!: string;
  @Input() controlName!: string;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  value: any = null;
  isDisabled = false;

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: any){
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur(){
    this.onTouched()
  }
  constructor(@Optional() private controlContainer: ControlContainer) {
   }

  ngOnInit() {}

  get control(): FormControl {
    return this.controlContainer?.control?.get(this.controlName) as FormControl;
  }

  get showError(): boolean {
    return this.control &&
            this.control.invalid &&
            (this.control.dirty || this.control.touched)

  }

}
