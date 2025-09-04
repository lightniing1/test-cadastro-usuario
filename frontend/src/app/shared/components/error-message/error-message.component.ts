import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
  imports: [MatFormFieldModule]
})
export class ErrorMessageComponent {
  public control = input.required<AbstractControl>();

  // Signal computado para verificar se o erro deve ser exibido
  public showError = computed(() => {
    const ctrl = this.control();
    return ctrl.invalid && (ctrl.touched || ctrl.dirty);
  });

  // Signal computado para obter a primeira chave de erro
  private errorKey = computed(() => {
    const errors = this.control().errors;
    if (errors) {
      return Object.keys(errors)[0];
    }
    return null;
  });

  // Signal computado que retorna a mensagem de erro apropriada
  public errorMessage = computed(() => {
    const key = this.errorKey();
    const errors = this.control().errors;
    if (!key || !errors) return '';

    switch (key) {
      case 'required':
        return 'This field is required.';
      case 'email':
        return 'Please enter a valid email address.';
      case 'minlength':
        return `Must be at least ${errors['minlength'].requiredLength} characters long.`;
      case 'mustMatch':
        return 'Passwords do not match.';
      default:
        return 'Invalid value.';
    }
  });
}