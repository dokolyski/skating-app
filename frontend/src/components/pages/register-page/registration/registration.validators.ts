import { AbstractControl, FormGroup } from '@angular/forms';

export namespace Validators {
  export function passwordPassAllRegex(controler: AbstractControl) {
    const password = controler.value

    const containsDigits = /\d+/
    const containsUppercase = /[A-Z]+/
    const containsLowercase = /[a-z]+/
    const containsSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/
    const all = [containsDigits, containsUppercase, containsLowercase, containsSpecialCharacters]

    return !all.every(v => v.test(password)) ? {'not-pass-regex': true} : null
  }

  export function aboveEntrophy(value: number) {
    return function(controler: AbstractControl) {
      const password = controler.value
      
      const isBeloweEntrophy = (part: number): boolean => {
        const entrophy = calculateEntrophy(password)
        const partEntrophy = calculatePartMaxEntrophy(part, password)
        return entrophy < partEntrophy
      }

      const calculateEntrophy = (password: string): number => {
        const charsCounter = Array.from(password).reduce((p, c) => {
          if(!p[c]) {
            p[c] = 0
          }
          p[c]++
          return p
        }, {})
        
        const pswdLen = password.length
        return Object.values<number>(charsCounter).reduce((p, c) => p - c/pswdLen * Math.log2(c/pswdLen), 0)
      }
    
      const calculatePartMaxEntrophy = (part: number, password: string): number => {
        return -part*Math.log2(1/password.length)
      }
      
      return isBeloweEntrophy(value) ? {'below-entrophy': true} : null
    }
  }

  export function repeatPassword(base: FormGroup) {
    const controler = base.get('repeatPassword')
    const password = base.get('password').value
    const different = password.length && controler.value != password
    
    let errors = controler.errors ?? {}
    if(different) {
      errors['not-equals'] = true
    } else if(Object.keys(errors).length) {
      delete errors['not equals']
    } else {
      errors = null
    }

    controler.setErrors(errors)
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