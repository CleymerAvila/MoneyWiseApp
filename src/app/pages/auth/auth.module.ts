import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthPageRoutingModule } from './auth-routing.module';

import { SharedModule } from 'src/app/shared/shared-module';
import LoginPageComponent from './login-page/login-page.component';
import AuthPage from './auth.page';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthPageRoutingModule,
],
  declarations: [AuthPage, LoginPageComponent, RegisterPageComponent]
})
export class AuthPageModule {}
