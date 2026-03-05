import { Component, OnInit } from '@angular/core';
import { StorageService } from './core/services/storage-service';
import { AuthService } from './core/services/auth-service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  constructor(private storageService: StorageService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.storageService.init();
    const currentUser = await this.storageService.get<User>('user');

    if(currentUser){
      await this.authService.login(currentUser.email, currentUser.password);
    }
  }
}
