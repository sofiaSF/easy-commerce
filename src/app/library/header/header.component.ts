import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  buttonTemplate;

  constructor(private router:Router) { 
    this.buttonTemplate = null;
  }

  ngOnInit(): void {
  }

  click(){
    this.router.navigate(["products"]);
  }

}
