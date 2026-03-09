import { Component, OnInit } from '@angular/core';
import { ICON_CATEGORIES } from 'src/app/shared/constants/icon-categories';
import { IconCategory } from 'src/app/shared/models/icon-category.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  listOptions: IconCategory[] = ICON_CATEGORIES;
  constructor() { }

  async ngOnInit() {
    // this.listOptions = ICON_CATEGORIES
  }

}
