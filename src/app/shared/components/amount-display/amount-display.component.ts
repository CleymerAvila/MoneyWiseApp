import { Component, Input, OnInit } from '@angular/core';
import { IonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-amount-display',
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss'],
  standalone: false
})
export class AmountDisplayComponent  implements OnInit {
  @Input() amount!: number;
  @Input() type!: string;
  @Input() size!: 'small' | 'medium' | 'large';
  constructor() { }

  ngOnInit() {}

}
