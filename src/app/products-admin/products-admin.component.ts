import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormService } from '../services/form.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
  providers:[FormService]
})
export class ProductsAdminComponent implements OnInit, OnDestroy {

  ngUnsubscribe: Subject<void> = new Subject<void>();
  products: any[];
  unities: any[];
  showModalValue:boolean;
  title;

  constructor(public productsService: ProductsService,public formService:FormService) { }

  ngOnInit(): void {
    this.productsService.chargeProducts();
    this.showModalValue =false;
    this.title = "";
    this.unities = this.getUnity();

  }

  getUnity() {
    return [{ label: "1", value: 1 }, { label: "2", value: 2 }, { label: "10", value: 10 },
    { label: "4", value: 4 }, { label: "15", value: 15 }, { label: "6", value: 6 }
    ];
  }

  eliminateProduct(product) {
    this.productsService.deleteProduct(product).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res => {
        if(res){
          this.productsService.chargeProducts();
        }
    });
    return false;
  }

  editProduct(product){
    this.formService.dataToCharge(product);
    this.showModalValue = true;
    this.title = "Editar Producto";
    return false;
  }

  close(){
    this.showModalValue = false;
    this.resetForm();
  }
  
  openModal(){
    this.title = "Nuevo Producto";
    this.showModalValue =true; 
  }

  onConfirm(){
    this.formService.confirmAction();
  }

  resetForm(){
    this.formService.resetForm();
  }

  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();

  }


}
