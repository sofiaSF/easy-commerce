import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormService } from '../services/form.service';
import { LoginService } from '../services/login-service.service';
import { takeUntil, shareReplay } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css'],
  providers:[FormService]
})
export class UsersAdminComponent implements OnInit,OnDestroy {

  users: any[];
  unities: any[];
  showModalValue:boolean;
  title;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public loginService: LoginService,public formService: FormService) { 
    this.title = "";
  }


  ngOnInit(): void {
    this.showModalValue = false;
    this.loginService.chargeUsers();
  }

  openUserModal(){
    this.title = "Nuevo Usuario"
    this.showModalValue = true;
  }

  onConfirm(){
    this.formService.confirmAction();
  }

  close(){
    this.resetForm();
    this.showModalValue = false;
  }

  resetForm(){
    this.formService.resetForm();
  }

  eliminateUser(user) {
    this.loginService.deleteUser(user).pipe(takeUntil(this.ngUnsubscribe),shareReplay()).subscribe(
      res => {
        if(res){
          this.loginService.chargeUsers();
        }
    });
    return false;
  }

  editUser(user){
    this.title = "Editar Usuario"
    this.formService.dataToCharge(user);
    this.showModalValue = true;
    return false;
  }
    
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();

  }



}
