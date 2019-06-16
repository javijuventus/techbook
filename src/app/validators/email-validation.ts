import {AbstractControl} from '@angular/forms';
export class EmailValidation {

    static MatchEmail(AC: AbstractControl) {
       const email = AC.get('email').value; // to get value in input tag
       const confirmEmail = AC.get('emailConfirm').value; // to get value in input tag
       if (email !== confirmEmail) {
            console.log('false');
            AC.get('emailConfirm').setErrors( {MatchPassword: true} );
        } else {
            console.log('true');
            return null;
        }
    }
}
