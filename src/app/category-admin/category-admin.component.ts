import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormService } from '../services/form.service';
import { CategoryService } from '../services/category.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css'],
  providers:[FormService]
})
export class CategoryAdminComponent implements OnInit,OnDestroy {

  unities: any[];
  showModalValue:boolean;
  title;
  categories:any[];
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public categoryService: CategoryService,public formService: FormService) { 
    this.title = "";
  }

  ngOnInit(): void {
    this.showModalValue = false;
    this.categoryService.chargeCategories();
  }


  openCategoryModal(){
    this.title = "Nueva Categoría"
    this.showModalValue = true;
  }

  onConfirm(){
    this.formService.confirmAction();
  }

  resetForm(){
    this.formService.resetForm();
  }

  eliminateCategory(category) {
    
    this.categoryService.deleteCategory(category).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res => {
        if(res){
          this.categoryService.chargeCategories();
        }
      }
    );
    return false;
  }

  editCategory(category){
    this.title = "Editar Categoría"
    this.formService.dataToCharge(category);
    this.showModalValue = true;
    return false;
  }

  close(){
    this.showModalValue = false;
    this.resetForm();
  }

  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();

  }



}
