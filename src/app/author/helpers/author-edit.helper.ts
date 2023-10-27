import { FormControl, FormGroup, Validators } from '@angular/forms';

export function createAuthorForm() {
    return new FormGroup({
      nameAndSurname: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        minTwoWords,
      ])
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