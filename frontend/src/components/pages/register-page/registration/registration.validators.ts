import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher as ESM } from '@angular/material/core';

export namespace Validators {
  export function repeatPassword(base: FormGroup): ValidationErrors {
    const different = base.get('repeatPassword').value != base.get('password').value
    return different ? {'not-equals': true} : null
  }
}

export namespace ErrorStateMatchers {
  export class RepeatPassword implements ESM {
    isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
      console.log(control.dirty, control.invalid)
      return control.dirty && control.invalid
    } 
  }
}

// export class PasswordErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
//     const entrophy = this.calculateEntrophy(control.value)
//     const partEntrophy = this.calculatePartMaxEntrophy(0.3, control.value)

//     const isTooShort = control.value.length < 8
//     const isTooLong = control.value.length > 16
//     const isTooEasy = !this.passRegularExpressions(control.value) || entrophy < partEntrophy

//     control.setErrors({
//       'too-short': isTooShort,
//       'too-long': isTooLong,
//       'too-easy': isTooEasy
//     })
    
//     return control.dirty && (isTooShort || isTooLong || isTooEasy)
//   } 

//   private passRegularExpressions(password: string): boolean {
//     const containsDigits = /\d+/
//     const containsUppercase = /[A-Z]+/
//     const containsLowercase = /[a-z]+/
//     const containsSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/
//     return [containsDigits, containsUppercase, containsLowercase, containsSpecialCharacters].every(v => v.test(password))
//   }

//   private calculateEntrophy(password: string): number {
//     const charsCounter = Array.from(password).reduce((p, c) => {
//       if(!p[c]) {
//         p[c] = 0
//       }
//       p[c]++
//       return p
//     }, {})
    
//     const pswdLen = password.length
//     return Object.values<number>(charsCounter).reduce((p, c) => p - c/pswdLen * Math.log2(c/pswdLen), 0)
//   }

//   private calculatePartMaxEntrophy(part: number, password: string): number {
//     return -part*Math.log2(1/password.length)
//   }
// }

// export class NameErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
//     /* If can distinguish upper and lower case then, 
//     regex starts with upper case, rest lower case
//     if not then only check if it constains unicode characters without distinction*/
//     const isInvalid = !/^([\p{Lu}A-Z][\p{Ll}a-z]+)|\p{Lo}+$/.test(control.value)

//     control.setErrors({
//       'invalid': isInvalid
//     })

//     return control.dirty && isInvalid
//   } 
// }

// export class LastnameErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
//     /* If can distinguish upper and lower case then, 
//     regex starts with upper case, rest lower case
//     if not then only check if it constains unicode characters without distinction*/
//     const isInvalid = !/^([\p{Lu}A-Z][\p{Ll}a-z]+)|\p{Lo}+$/.test(control.value)
    
//     control.setErrors({
//       'invalid': isInvalid
//     })

//     return control.dirty && isInvalid
//   } 
// }

// export class DatebirthdayErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
//     const today = new Date().getTime()
//     const birthday = new Date(control.value).getTime()
//     const age = new Date(today - birthday).getFullYear()

//     const isInvalid = 122 - age < 0

//     control.setErrors({
//       'invalid': isInvalid
//     })

//     return control.dirty && isInvalid
//   } 
// }