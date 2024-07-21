import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
  getFieldError(form: FormGroup, field: string): string | null {
    if(!form.controls[field]) return null;

    const errors = form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength } caracteres.`;

        case 'pattern':
          if(field === 'fullname') return `El formato debe ser nombre y apellido`;

          if(field === 'email') return `Debe ser un email válido`;

          if(field === 'password') return `La contraseña debe tener mínimo una mayúscula, una minúscula y un número`
          break;

        case 'notEqual':
          return 'Las contraseñas deben ser iguales';

        case 'userFound':
          return `El ${field} ya se encuentra en uso`;

        case 'min':
          return `El valor debe ser mínimo ${errors['min'].min}`;

        case 'max':
          return `El valor debe ser máximo ${errors['max'].max}`;
      }
    }

    return null;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string){
    return (formGroup: AbstractControl ): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if(fieldValue1 !== fieldValue2){
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    }
  }
}
