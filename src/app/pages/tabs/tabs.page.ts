import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  constructor(protected authService: AuthService) { }

  ngOnInit() {
  }

}
