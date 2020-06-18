import { Component, OnInit, Input, EventEmitter, Output, ViewChild, AfterViewInit, ContentChildren, TemplateRef, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit,AfterViewChecked {

  displayValue:boolean;

  @Input()
  disabled:boolean;

  @Input()
  title:string;

  
  @Input()
  closable:boolean;

  @Input()
  get display(){
    return this.displayValue;
  }

  @Output()
  onConfirm: EventEmitter<any> =  new EventEmitter<any>();

  @Output()
  onClose: EventEmitter<any> =  new EventEmitter<any>();

  set display(value){
    this.displayValue = value;
    this.displayChange.emit(this.displayValue);
  }

  @Output()
  displayChange: EventEmitter<any> =  new EventEmitter<any>();

  @Input()
  bodyTemplate: TemplateRef<any>;

  @Input()
  headerTemplate: TemplateRef<any>;

  @Input()
  footerTemplate: TemplateRef<any>;

  @Input()
  translate:boolean;
  
  constructor(private dc: ChangeDetectorRef) {
    this.disabled = false;
    this.display = false;
    this.translate = false;
    this.closable = false;
  }
  ngAfterViewChecked(): void {
    this.dc.detectChanges();
  }


  onCancel(){
    this.onClose.emit();
    this.display = false;
  }

  confirm(){
    this.onConfirm.emit();
    if(this.closable){
      this.display = false;
    }
  }

  ngOnInit(): void {
    
  }


}
