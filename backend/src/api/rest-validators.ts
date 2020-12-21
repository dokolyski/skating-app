import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";
 
export function PasswordPassRegexes(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "passwordPassRegexes",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const containsDigits = /\d+/i;
                    const containsUppercase = /[A-Z]+/i;
                    const containsLowercase = /[a-z]+/i;
                    const containsSpecialCharacters = /[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+/i;
                    const list = [containsDigits, containsUppercase, containsLowercase, containsSpecialCharacters];
                    return list.every(v => v.test(value))
                }
            }
        });
   };
}

export function PasswordPassEntrophyTest(validationOptions?: ValidationOptions) {
    function calculateEntrophy(password: string): number {
        const charsCounter = Array.from(password).reduce((p, c) => {
          if(!p[c]) {
            p[c] = 0
          }
          p[c]++;
          return p
        }, {});
        
        const pswdLen = password.length;
        return Object.values<number>(charsCounter).reduce((p, c) => p - c/pswdLen * Math.log2(c/pswdLen), 0)
    }

    function calculatePartMaxEntrophy(part: number, password: string): number {
        return -part*Math.log2(1/password.length)
    }
    
    return function (object: Object, propertyName: string) {
         registerDecorator({
             name: "passwordPassRegexes",
             target: object.constructor,
             propertyName: propertyName,
             options: validationOptions,
             validator: {
                 validate(value: any, args: ValidationArguments) {
                    const entrophy = calculateEntrophy(value);
                    const partEntrophy = calculatePartMaxEntrophy(0.3, value);
    
                    return entrophy >= partEntrophy
                 }
             }
         });
    };
 }