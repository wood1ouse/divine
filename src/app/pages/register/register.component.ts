import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'divine-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      try {
        const { user, error } = await this.authService.register(
          email,
          password
        );

        if (error) {
          console.error('Error during sign up:', error.message);
        } else if (user) {
          this.router.navigate(['/']);
        }
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    }
  }
}
