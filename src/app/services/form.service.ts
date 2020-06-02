import { Injectable } from '@angular/core';
import {Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  $reset: Observable<boolean>;
  $confirm:  Observable<boolean>;
  $valid:  Observable<boolean>;
  $rescue: Observable<boolean>;
  $chargeData: Observable<any>;

  private validSubject: Subject<boolean>;
  private resetSubject: Subject<boolean>;
  private confirmSubject: Subject<boolean>;
  private rescueSubject: Subject<boolean>;
  private chargeSubject: Subject<any>;

  constructor() { 
    this.rescueSubject = new Subject<boolean>();
    this.validSubject = new Subject<boolean>();
    this.resetSubject =  new Subject<boolean>();
    this.confirmSubject =  new Subject<boolean>();
    this.chargeSubject =  new Subject<any>();
    this.$confirm = this.confirmSubject.asObservable();
    this.$reset = this.resetSubject.asObservable();
    this.$valid = this.validSubject.asObservable();
    this.$rescue = this.rescueSubject.asObservable();
    this.$chargeData = this.chargeSubject.asObservable();
  }

  resetForm(){
    this.resetSubject.next(true);
  }

  stopReset(){
    this.resetSubject.next(false);
  }

  confirmAction(){
    this.confirmSubject.next(true);
  }

  stopConfirm(){
    this.confirmSubject.next(false);
  }

  setValid(value){
    this.validSubject.next(value);
  }

  changeToRescue(){
    this.rescueSubject.next(true);
  }

  changeRescueForm(){
    this.rescueSubject.next(false);
  }

  dataToCharge(value){
    this.chargeSubject.next(value);
  }



}
