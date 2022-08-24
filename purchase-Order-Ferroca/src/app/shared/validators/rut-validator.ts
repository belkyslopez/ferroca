import { AbstractControl } from '@angular/forms';

export function rutIsValid(username: AbstractControl): { [key: string]: boolean } | null {
    if (username.value != null) {

        let cleanRut;

        let rut = username.value;

        let sum = 0;

        let multiple = 2;

        if (rut.trim().length < 3) {
            return { rutIsInvalid: true };
        }
        cleanRut = rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase();

        const body = cleanRut.slice(0, -1);

        let dv = cleanRut.slice(-1).toUpperCase();

        rut = body + '-' + dv;

        if (body.length < 7) { return { rutIsInvalid: true }; }

        for (let i = 1; i <= body.length; i++) {

            const index = multiple * cleanRut.charAt(body.length - i);

            sum = sum + index;

            if (multiple < 7) { multiple = multiple + 1; } else { multiple = 2; }

        }

        const dvExpected = 11 - (sum % 11);

        dv = (dv == 'K') ? 10 : dv;
        dv = (dv == 0) ? 11 : dv;

        if (dvExpected != dv) { return { rutIsInvalid: true }; }
    }

    return null;
}