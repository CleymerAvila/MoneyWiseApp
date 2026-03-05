import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: false,
})
export default class LoginPageComponent  implements OnInit {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;


  constructor(protected authService: AuthService) {
    this.email = new FormControl('',{
        validators: [Validators.required, Validators.email]
      });
    this.password = new FormControl('', {
      validators:  [Validators.required, Validators.minLength(9)],
    });
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    })
  }

  ngOnInit() {}

  onSubmit(){
    const emailValue = this.email.value;
    const passwordValue = this.password.value;
    this.authService.login(emailValue, passwordValue)
    this.loginForm.reset();
  }
}
