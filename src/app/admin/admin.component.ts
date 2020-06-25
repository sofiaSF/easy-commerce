import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { LoginService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,AfterViewInit,AfterViewChecked {

  @ViewChild('users')
  users;
  @ViewChild('products')
  products;
  @ViewChild('category')
  category;

  items = [];

  constructor(private loginService:LoginService,private router: Router,private detector: ChangeDetectorRef) {}
 
 
  ngAfterViewChecked(): void {
    this.detector.detectChanges();
  }


  ngAfterViewInit(): void {
    this.getUser();
  }

  ngOnInit(): void {
  }

  logOut(){
    this.loginService.logOut().subscribe();
    this.loginService.setUser(null);
    this.router.navigate(['/login']);
  }


  getUser(){
    this.loginService.user$.subscribe(user  => {
      if(user){
        this.items = this.getItems(user)
      }
    });
  }

  getItems(user){
    let items = [];
    if(user?.admin){
      items.push({header:'Adm de Usuarios',template:this.users});
    }
    items.push({header:'Adm de Categorías',template:this.category});
    items.push({header:'Adm de Productos',template:this.products}); 
    return items;
  }

}
