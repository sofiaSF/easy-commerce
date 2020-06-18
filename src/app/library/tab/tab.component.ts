import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'tabs',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit,AfterViewInit {

  @Input()
  items:any[];

  constructor(private detector: ChangeDetectorRef) { 
    this.items = [];
  }
  ngAfterViewInit(): void {
    this.detector.detectChanges();
  }

  ngOnInit(): void {
  }

}
