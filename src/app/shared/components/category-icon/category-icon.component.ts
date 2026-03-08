import { Component, Input, OnInit } from '@angular/core';
import { ICON_CATEGORIES } from '../../constants/icon-categories';
import { IconCategory } from '../../models/icon-category.model';

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

  iconCategories: IconCategory[] = ICON_CATEGORIES;

  constructor() { }

  ngOnInit() {
    const iconCategory = this.iconCategories.find(
      iconCateg => iconCateg.category === this.category
    );

    if(iconCategory){
      this.nameIcon = iconCategory.icon;
      this.colorBackground = iconCategory.colorBackground;
    }
  }

}
