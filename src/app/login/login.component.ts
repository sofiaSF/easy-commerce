import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  
  ngUnsubscribe: Subject<void> = new Subject<void>();
  loginForm: FormGroup;
  formBuilder: FormBuilder;
  errorMessage;

  constructor(private loginService: LoginService,private router: Router) { 
    this.errorMessage = false;
  }

  ngOnInit(): void {
    this.formBuilder = new FormBuilder();
    this.createFormGroup();
  }

  getControl(controlName:string){
    return this.loginForm.get(controlName);
  }

  createFormGroup(){
    this.loginForm = this.formBuilder.group({
      userControl : new FormControl('',[Validators.required]),
      passwordControl : new FormControl('',[Validators.required])
    });
  }

  login(){
    if(this.loginForm.valid){
      let user = {
        username: this.getControl("userControl").value,
        password: this.getControl("passwordControl").value
      }
      this.loginService.logIn(user)
      .pipe(takeUntil(this.ngUnsubscribe),catchError((error) => {
        return of({'error' : error});
      }))
      .subscribe(
        res => {
          if(!res.error){
            this.loginService.setUser(res);
            this.router.navigate(['/admin']);
          }
          else{
            this.errorMessage = true
          }
      });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();

  }

}
