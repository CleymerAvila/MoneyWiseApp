import { Component, Input, OnInit } from '@angular/core';


interface IconCategory {
  category: string;
  icon: string;
  colorBackground: string;
}
@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss'],
  standalone: false,
})
export class CategoryIconComponent  implements OnInit {
  @Input() category!: string;
  @Input() size!: string;
  nameIcon!: string;
  colorBackground!: string;

  iconCategories: IconCategory[] = [
    {
      category : 'Alimentación',
      icon: 'fast-food',
      colorBackground: 'darkblue'
    },
    {
      category: 'Transporte',
      icon: 'bus',
      colorBackground: 'blue'
    },
    {
      category: 'Vivienda',
      icon: 'home',
      colorBackground: 'green'
    },
    {
      category: 'Ocio',
      icon: 'ticket',
      colorBackground: 'violet'
    },
    {
      category: 'Salario',
      icon: 'cash',
      colorBackground: 'skyblue'
    },
    {
      category: 'Otros',
      icon: 'shirt',
      colorBackground: 'orange'
    }
  ]

  constructor() { }

  ngOnInit() {
    const iconCategory = this.iconCategories.find(iconCateg => iconCateg.category === this.category);

    if(iconCategory){
      this.nameIcon = iconCategory.icon;
      this.colorBackground = iconCategory.colorBackground;
    }
  }

}
