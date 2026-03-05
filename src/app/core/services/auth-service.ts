import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public static userCounted: number = 0;
  private userSubject = new BehaviorSubject<User | null>(null);
  private users: User[] = [];
  user$ = this.userSubject.asObservable();

  constructor(private storage: StorageService, private router: Router){
  }

  get currentUser(): User | null{
    return this.userSubject.value;
  }

  async login(email: string, password: string){
    const usersFromStorage = await this.storage.get<User[]>('users');

    if(usersFromStorage){
      this.users = usersFromStorage;
      console.log('Usuarios registrados', usersFromStorage)
      const user = this.users.find(u => u.email === email && u.password === password);
      console.log('Usuario valido despues de login', user)
      if(user) {
        await this.storage.set('user', user);
        this.userSubject.next(user);
        this.router.navigate(['/tabs'])
      } else {
        console.log('credenciales invalidas')
      }
    } else {
      console.log('No hay usuarios registrados, por favor registrese');
    }
  }

  async logout(){
    this.storage.remove('user');
    this.userSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }


  async registerUser(user: User){
    const usersFromStorage = await this.storage.get<User[]>('users');

    if(usersFromStorage){
      console.log('usuarios en el storage: ', usersFromStorage)
      this.users = usersFromStorage;
      const userFound = this.users.find(u => u.email === user.email);

      if(userFound){
        console.log('User already registered', userFound)
        return;
      }
    }

    this.users.push(user);
    this.userSubject.next(user);
    await this.storage.set('users', this.users);

    console.log('User registered succesfully!', user);
    this.router.navigate(['./auth/login'])
  }
}
