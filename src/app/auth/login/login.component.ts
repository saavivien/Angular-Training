import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.initLoginForm()
  }
  private initLoginForm() {
    this.loginForm = this.formBuilder.group({
      'login': ['', [Validators.required, Validators.minLength(4)]],
      'password': ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  onLogin() {
    const login = this.loginForm.value.login;
    const password = this.loginForm.value.password;

    this.authService.login(login+password);

    this.router.navigateByUrl('facesnaps')
  }
}
