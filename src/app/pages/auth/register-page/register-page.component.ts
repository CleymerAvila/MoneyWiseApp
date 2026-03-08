import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth-service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  standalone: false,
})
export class RegisterPageComponent  implements OnInit {
  fullName!: FormControl;
  email!: FormControl;
  password!: FormControl;
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {
    this.initForm()
  }

  ngOnInit() {}


  initForm(){
    this.fullName = new FormControl('', Validators.required);
    this.email = new FormControl('',[
        Validators.required,
        Validators.email
      ]
    );
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(12)
    ]);

    this.registerForm = new FormGroup({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    })
  }

  async onSubmit() {
    const fullNameValue = this.fullName.value;
    const emailValue = this.email.value;
    const passwordValue = this.password.value;

    const newUser: User = {
      id: uuid(),
      fullName: fullNameValue,
      email: emailValue,
      password: passwordValue
    }

    await this.authService.registerUser(newUser);
    this.registerForm.reset();
  }
}
