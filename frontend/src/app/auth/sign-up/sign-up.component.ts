import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { finalize } from 'rxjs';
import { UserRegistration } from '../../core/models/user-registration.interface';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ErrorMessageComponent,
  ],
})
export class SignUpComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  isLoading = signal(false);

  form = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: passwordMatchValidator,
    }
  );

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading.set(true);

    const userData = this.form.getRawValue() as UserRegistration;

    this.authService
      .signUp(userData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Registration successful! Please log in.'
          );
          this.router.navigate(['/signin']);
        },
      });
  }
}
