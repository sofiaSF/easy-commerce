import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { summaryFileName } from '@angular/compiler/src/aot/util';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  ngUnsubscribe: Subject<any>;
  mailRegExp: RegExp = new RegExp("^[a-zA-z0-9._]+@[a-zA-z0-9.]+[.][a-z]{1,3}$");
  passwordRegExp: RegExp = new RegExp("^[a-zA-z#!0-9]{8,18}");

  constructor() { 
    this.ngUnsubscribe = new Subject();
  }

  validatePasswordControl(control:AbstractControl){
    control.valueChanges.subscribe(
      value => {
        if(value && !value.toString().match(this.passwordRegExp)){
          control.setErrors({
            passwordError: "contraseña inválida"
          });
        }
      }
    );
  }


  validateEmailControl(control:AbstractControl){
    control.valueChanges.subscribe(
      value => {
        if(value && !value.toString().match(this.mailRegExp)){
          control.setErrors({
            emailError: "correo electrónico inválido"
          });
        }
      }
    );
  }

  private transformValue(value:number){
    let sum = (a,b) => {
      return (Number.parseInt(a)+Number.parseInt(b)).toString();
    }
    let val = value.toString().split("").reduce(sum);
    return val;
  }


  validateCard(number){
    let array:any[] = number.toString().split("");
    let fn = (a,b,i,array) => {
      let index = array.length -2;
      if(index%2==0 && i%2==0 || index%2!=0 && i%2!=0){
        let value = Number.parseInt(b)*2;
        b = value > 9? this.transformValue(value) : value.toString();
      }
      return (Number.parseInt(a)+Number.parseInt(b)).toString();
    } 
    let r=array.reduceRight(fn);
    return (Number.parseInt(r)%10==0 && Number.parseInt(r) < 150);
  }




}
