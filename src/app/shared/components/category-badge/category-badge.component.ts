import { Component, Input, OnInit } from '@angular/core';
import { IconCategory } from '../../models/icon-category.model';
import { ICON_CATEGORIES } from '../../constants/icon-categories';

@Component({
  selector: 'app-category-badge',
  templateUrl: './category-badge.component.html',
  styleUrls: ['./category-badge.component.scss'],
  standalone: false,
})
export class CategoryBadgeComponent implements OnInit {
  @Input() category!: string;
  @Input() showIcon!: boolean;
  nameIcon!: string;
  backgroundColor!: string;

  iconCategories: IconCategory[] = ICON_CATEGORIES;

  constructor() {}

  async ngOnInit() {
    const iconCategory = this.iconCategories.find(
      iconCateg => iconCateg.category === this.category
    )

    if(iconCategory){
      this.nameIcon = iconCategory.icon;
      this.backgroundColor = iconCategory.colorBackground;
    }
  }
}
