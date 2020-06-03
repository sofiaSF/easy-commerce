import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize,takeUntil } from 'rxjs/operators';
import { FormService } from 'src/app/services/form.service';
import { ProductsService } from 'src/app/services/products.service';
import { ImageService } from 'src/app/services/image.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  ngUnsubscribe: Subject<void> = new Subject<void>();
  productForm: FormGroup;
  formBuilder: FormBuilder;
  noPhotoUrl: string;
  updatedProduct:any;
  @Output()
  closeModal: EventEmitter<any> = new   EventEmitter<any>();
  myFile: any[];
  upload:boolean;
  invalidForm:boolean;

  @ViewChild("uploadComponent")
  uploadComponent;
  categories;
  categoriesDropdown;


  constructor( private formService: FormService,private productsService: ProductsService,
    private imgService:ImageService, private categoryService:CategoryService) {
    this.formBuilder = new FormBuilder();
    this.noPhotoUrl = "../../../assets/no-photo.png";
    this.updatedProduct = null;
    this.myFile = [];
    this.categories =[];
    this.categoriesDropdown = [];
  }
 

  ngOnInit(): void {
    this.categoryService.chargeCategories();
    this.chargeCategories();
    this.buildForm();
    this.onResetForm();
    this.onConfirmForm();
    this.onChargeData();
  }

  createDropdown(list){
    this.categoriesDropdown = [];
    list.map(elem => {
      let drop={
        label: elem.name,
        value: elem
      }
      this.categoriesDropdown.push(drop);
    });

  }


  chargeCategories(){
    this.categoryService.category$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      if(res){
        this.createDropdown(res);
      }
    } );
  }

  chargeForm(product){
    this.getControl('nameControl').setValue(product.name),
    this.getControl('quantityControl').setValue(product.quantity),
    this.getControl('imgControl').setValue(product.image)
    this.getControl('priceControl').setValue(product.price)
    this.getControl('categoryControl').setValue(product.category)
  }

  onChargeData(){
    this.formService.$chargeData
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(res => {
      if(res){
        this.updatedProduct = res;
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

  createProduct(){
    let product = {
      name: this.getControl('nameControl').value,
      quantity: this.getControl('quantityControl').value,
      image: this.getControl('imgControl').value,
      price: this.getControl('priceControl').value,
      category: this.getControl('categoryControl').value,
    }
    return product;
  }

  registerProduct(){
    this.productsService.createProduct(this.createProduct())
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      res => {
        if(res){
          this.closeModal.emit();
          this.productsService.chargeProducts();
        }
      }); 
  }

  editProduct(){
    let product = this.createProduct();
    product["id"] = this.updatedProduct.id;
    this.productsService.updateProduct(product)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      res => {
        if(res){
          this.updatedProduct = null;
          this.closeModal.emit();
          this.productsService.chargeProducts();
        }
      }); 
  }


  onUpload(event){
   this.myFile = event.files;
   this.imgService.createImageFromBlob(this.myFile[0]);
  }

  setImage(){
    if(this.imgService.imageBlobUrl){
      this.getControl("imgControl").setValue(this.imgService.imageBlobUrl);
      this.imgService.imageBlobUrl = null;
    }
  }

  onConfirmForm(){
    this.formService.$confirm
    .pipe(takeUntil(this.ngUnsubscribe),finalize(()=> this.formService.stopConfirm()))
    .subscribe(res => {
      if(res){
        this.invalidForm = this.productForm.invalid;
        if(!this.invalidForm){
          this.setImage();
          this.upload = true;
          this.updatedProduct? this.editProduct() : this.registerProduct();
        }
      }
    } );
  }
  
  resetForm(){
    this.invalidForm = false;
    if(this.uploadComponent){
      this.uploadComponent.clear();
    }
    this.myFile = [];
    this.upload = false;
    this.productForm.reset();
    this.getControl("imgControl").setValue(this.noPhotoUrl);
  }

  invalidControl(name){
    return this.productForm.get(name).invalid;
  }

  buildForm(){
    this.productForm = this.formBuilder.group({
      nameControl: new FormControl('',[Validators.required]),
      priceControl: new FormControl('',[Validators.required]),
      quantityControl: new FormControl('',[Validators.required]),
      imgControl: new FormControl(this.noPhotoUrl,[]),
      categoryControl: new FormControl('',[Validators.required])
    }
    ); 
    
    this.productForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data => {this.formService.setValid(this.productForm.valid);}
    );

  }

  invalidReaction(control:string){
    return this.invalidForm && this.invalidControl(control);
  }

  required(control:string){
    return this.getControl(control).hasError('required');
  }

  getControl(name){
    return this.productForm.get(name);
  }

  ngOnDestroy(): void {
    this.formService.dataToCharge(null);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();

  }

}

