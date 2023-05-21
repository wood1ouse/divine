import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthFacade } from '@facades/auth.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'divine-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  authError$: Observable<string | null>;

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.authError$ = this.authFacade.authError$;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authFacade.dispatchLogin({ email, password });
    }
  }
}
