import { AbstractControl, FormGroup } from '@angular/forms';
import { Validators as AngularValidators } from '@angular/forms';

export namespace Validators {
  export const email = AngularValidators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')

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