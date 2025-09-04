import {
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of, startWith } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/user-profile.interface';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ErrorMessageComponent } from "../../shared/components/error-message/error-message.component";
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  imports: [
    ReactiveFormsModule,
    MatCardActions,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ErrorMessageComponent
],
})
export class SettingsComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  authService = inject(AuthService);

  isLoading = signal(false);
  successMessage = signal<string | null>(null);

  private userProfile$ = this.userService.getProfile().pipe(
    startWith(null),
    catchError((error) => of({ error: error.message }))
  );

  userProfile = toSignal(this.userProfile$);

  isProfileLoading = computed(() => this.userProfile() === null);
  hasProfileError = computed(
    () => this.userProfile() && 'error' in this.userProfile()!
  );

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    // Effect to populate form when user data loads
    effect(() => {
      const profile = this.userProfile();
      if (profile && !('error' in profile)) {
        this.form.patchValue(profile);
      }
    });
  }

  onUpdate(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.successMessage.set(null);

    const settings = this.form.getRawValue() as UserProfile;

    this.userService.updateProfile(settings).subscribe({
      next: (updatedProfile) => {
        this.isLoading.set(false);
        this.successMessage.set('Profile updated successfully!');
        this.form.patchValue(updatedProfile);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
    });
  }
}
