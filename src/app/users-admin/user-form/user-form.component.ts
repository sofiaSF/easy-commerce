import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize,takeUntil, shareReplay } from 'rxjs/operators';
import { FormService } from 'src/app/services/form.service';
import { LoginService } from 'src/app/services/login-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  ngUnsubscribe: Subject<void> = new Subject<void>();
  registerForm: FormGroup;
  formBuilder: FormBuilder;
  updatedUser:any;
  invalidForm:boolean;

  @Output()
  closeModal: EventEmitter<any> = new   EventEmitter<any>();



  constructor(private formService: FormService,private loginService:LoginService,
    public validationService: ValidationService) {
    this.formBuilder = new FormBuilder();

  }


  ngOnInit(): void {
    this.buildForm();
    this.onResetForm();
    this.onConfirmForm();
    this.onChargeData();
    let r1 = this.validationService.validateCard(4013200209774812);
    let r2= this.validationService.validateCard(377791019507556);
    console.log(r1);
  }

  toggleType(event,input){
  
    if(input.type == "text"){
      input.type = "password";
      event.target.classList.remove("pi-eye-slash");
      event.target.classList.add("pi-eye");
    }
    else{
      input.type = "text";
      event.target.classList.add("pi-eye-slash");
      event.target.classList.remove("pi-eye");
    }
  }

  buildForm(){
    this.registerForm = this.formBuilder.group({
      nameControl: new FormControl('',[Validators.required]),
      passControl: new FormControl('',[Validators.required]),
      emailControl: new FormControl('',[Validators.required])
    }
    ); 
    
    this.registerForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe),shareReplay()).subscribe(
      data => {this.formService.setValid(this.registerForm.valid);}
    );

    this.validationService.validateEmailControl(this.getControl('emailControl'));
    this.validationService.validatePasswordControl(this.getControl('passControl'));

  }

  changeToRescueForm(){
    this.resetForm();
    this.formService.changeToRescue();
  }


  chargeForm(user){
    this.getControl('nameControl').setValue(user.username),
    this.getControl('passControl').setValue(user.password),
    this.getControl('emailControl').setValue(user.email)
  }

  onChargeData(){
    this.formService.$chargeData
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      if(res){
        this.updatedUser = res;
        this.chargeForm(res);
      }
    } );
  }

  onResetForm(){
    this.formService.$reset
    .pipe(takeUntil(this.ngUnsubscribe),finalize(()=> this.formService.stopReset()))
    .subscribe(res => {
      if(res){
        this.resetForm();
      }
    } );
  }

  invalidReaction(control:string){
    return this.invalidForm && this.invalidControl(control);
  }

  createUser(){
    let product = {
      username: this.getControl('nameControl').value,
      password: this.getControl('passControl').value,
      email: this.getControl('emailControl').value,
      creationDate: new Date(),
    }
    return product;
  }

  required(control:string){
    return this.getControl(control).hasError('required');
  }

  registerUser(){
    this.loginService.createUser(this.createUser())
    .pipe(takeUntil(this.ngUnsubscribe),shareReplay())
    .subscribe(
      res => {
        if(res){
          this.closeModal.emit();
          this.loginService.chargeUsers();
        }
      }); 
  }

  editUser(){
    let user = this.createUser();
    user["id"] = this.updatedUser.id;
    this.loginService.updateUser(user)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      res => {
        if(res){
          this.updatedUser = null;
          this.closeModal.emit();
        }
      }); 
  }

  onConfirmForm(){
    this.formService.$confirm
    .pipe(takeUntil(this.ngUnsubscribe),finalize(()=> {
      this.formService.stopConfirm();
    }))
    .subscribe(res => {
      if(res){
        this.invalidForm = this.registerForm.invalid;
        if(!this.invalidForm){
          this.updatedUser? this.editUser() : this.registerUser();
        }
      }
    } );
  }
  
  resetForm(){
    this.invalidForm = false;
    this.registerForm.reset();
  }

  invalidControl(name){
    return this.registerForm.get(name).invalid;
  }

  getControl(name){
    return this.registerForm.get(name);
  }

  ngOnDestroy(): void {
    this.formService.dataToCharge(null);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();

  }


}

