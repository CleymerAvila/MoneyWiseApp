import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICON_CATEGORIES } from '../../constants/icon-categories';
import { IconCategory } from '../../models/icon-category.model';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss'],
  standalone: false,
})
export class CategoryIconComponent  implements OnChanges{
  @Input() category!: string;
  @Input() size!: string;
  nameIcon!: string;
  colorBackground!: string;

  iconCategories: IconCategory[] = ICON_CATEGORIES;

  constructor() { }


  ngOnChanges(changes: SimpleChanges) {

    if (changes['category']) {

      const iconCategory = this.iconCategories.find(
        icon => icon.category === this.category
      );

      if (iconCategory) {
        this.nameIcon = iconCategory.icon;
        this.colorBackground = iconCategory.colorBackground;
      }

    }

  }
}
