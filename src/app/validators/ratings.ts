import { FormControl } from '@angular/forms';

export class RatingsValidator {

  static checkRating(control: FormControl): any {

    if (control.value !== 0) {
      return {
        'Voto emitido': true
      };
    }

    return null;
  }

}


