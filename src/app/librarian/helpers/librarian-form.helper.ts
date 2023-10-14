import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createLibrarianForm() {
  return new FormGroup({
    nameAndSurname: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Za-z\s]+$/),
      minTwoWords,
    ]),
    userType: new FormControl({ value: 'Bibliotekar', disabled: true }),
    jmbg: new FormControl(null, [
      Validators.required,
      Validators.minLength(13),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9_-]+$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      passwordMatch,
    ]),
    userImage: new FormControl(null),
  });
}

export function minTwoWords(control: FormControl) {
  if (!control.value) {
    return null;
  }
  const words = control.value
    .split(' ')
    .filter((word: string) => word.trim() != '');
  if (words.length < 2) {
    return { minimumTwoWords: true };
  }
  return null;
}

export function passwordMatch(control: FormControl) {
  if (
    !control.parent ||
    !control.parent.get('password') ||
    !control.parent.get('confirmPassword')
  ) {
    return null;
  }
  const formGroup = control.parent as FormGroup;
  const password = formGroup.get('password').value;
  const confirmPassword = formGroup.get('confirmPassword').value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  }
  return null;
}
