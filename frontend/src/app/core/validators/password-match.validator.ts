import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ mustMatch: true });
    return { mustMatch: true };
  } else {
    if (confirmPassword.hasError('mustMatch')) {
      const { mustMatch, ...errors } = confirmPassword.errors ?? {};
      confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }
    return null;
  }
};