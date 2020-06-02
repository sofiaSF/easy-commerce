import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize,takeUntil } from 'rxjs/operators';
import { FormService } from 'src/app/services/form.service';
import { LoginService } from 'src/app/services/login-service.service';
import { CategoryService } from 'src/app/services/category.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit,OnDestroy{

  ngUnsubscribe: Subject<void> = new Subject<void>();
  categoryForm: FormGroup;
  formBuilder: FormBuilder;
  updatedCategory:any;
  invalidForm:boolean;

  @Output()
  closeModal: EventEmitter<any> = new   EventEmitter<any>();



  constructor(private formService: FormService,private categoryService: CategoryService,
    private validationService: ValidationService) {
    this.formBuilder = new FormBuilder();

  }


  ngOnInit(): void {
    this.buildForm();
    this.onResetForm();
    this.onConfirmForm();
    this.onChargeData();

  }

  buildForm(){
    this.categoryForm = this.formBuilder.group({
      nameControl: new FormControl('',[Validators.required]),
      descriptionControl: new FormControl('',[Validators.required]),
    }
    ); 
    
    this.categoryForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {this.formService.setValid(this.categoryForm.valid);}
    );

  }

  chargeForm(category){
    this.getControl('nameControl').setValue(category.name);
    this.getControl('descriptionControl').setValue(category.description);
  }

  onChargeData(){
    this.formService.$chargeData
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      if(res){
        this.updatedCategory = res;
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

  createCategory(){
    let product = {
      name: this.getControl('nameControl').value,
      description: this.getControl('descriptionControl').value
    }
    return product;
  }

  registerCategory(){
    this.categoryService.createCategory(this.createCategory())
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      res => {
        if(res){
          this.closeModal.emit();
          this.categoryService.chargeCategories();
        }
      }); 
  }

  editCategory(){
    let category = this.createCategory();
    category["id"] = this.updatedCategory.id;
    this.categoryService.updateCategory(category)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      res => {
        if(res){
          this.updatedCategory = null;
          this.closeModal.emit();
          this.categoryService.chargeCategories();
        }
      });  
  }

  
  required(control:string){
    return this.getControl(control).hasError('required');
  }

  invalidReaction(control:string){
    return this.invalidForm && this.invalidControl(control);
  }

  onConfirmForm(){
    this.formService.$confirm
    .pipe(takeUntil(this.ngUnsubscribe),finalize(()=> this.formService.stopConfirm()))
    .subscribe(res => {
      if(res){
        this.invalidForm = this.categoryForm.invalid;
        if(!this.invalidForm){
          this.updatedCategory? this.editCategory() : this.registerCategory();
        }
      }
    } );
  }
  
  resetForm(){
    this.invalidForm = false;
    this.categoryForm.reset();
  }

  invalidControl(name){
    return this.categoryForm.get(name).invalid;
  }

  getControl(name){
    return this.categoryForm.get(name);
  }

  ngOnDestroy(): void {
    this.formService.dataToCharge(null);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();

  }


}

