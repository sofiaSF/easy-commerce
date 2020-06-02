import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsSubject: BehaviorSubject<any>;
  products$: Observable<any>;
  private selectedProductsSubject: BehaviorSubject<any>;
  selectedProducts$: Observable<any>;
  private cartModeSubject: BehaviorSubject<boolean>;
  cartMode$: Observable<boolean>;
  private checkinModeSubject: BehaviorSubject<boolean>;
  checkinMode$: Observable<boolean>;
  private allSelectedProductsSubject: BehaviorSubject<any>;
  allSelectedProducts$: Observable<any>;
  selectedProducts: any[];
  allSelectedProducts: any[];
  id= 0;

  port = "4000"
  baseUrl = "http://localhost:" + this.port + "/api/";

  constructor(private http: HttpClient) { 
    this.selectedProductsSubject = new BehaviorSubject<any>([]);
    this.selectedProducts$ = this.selectedProductsSubject.asObservable();
    this.allSelectedProductsSubject = new BehaviorSubject<any>([]);
    this.allSelectedProducts$ = this.allSelectedProductsSubject.asObservable();
    this.productsSubject =  new BehaviorSubject<any>([]);
    this.cartModeSubject = new BehaviorSubject<boolean>(false);
    this.checkinModeSubject =  new BehaviorSubject<boolean>(false);
    this.checkinMode$ = this.checkinModeSubject.asObservable();
    this.cartMode$ = this.cartModeSubject.asObservable();
    this.products$ = this.productsSubject.asObservable();
  }

  setOneSelectedProduct(value){
    this.selectedProducts = [...this.selectedProductsSubject.getValue()];
    let index = this.selectedProducts.findIndex( elem => elem.name == value.name);
    if(this.selectedProducts[index]){
      let elem = {...this.selectedProducts[index]}
      elem.quantity += value.quantity;
      this.selectedProducts[index] = elem;
    }
    else{
      this.selectedProducts.push({...value});
    }
    this.allSelectedProducts = [...this.allSelectedProductsSubject.getValue()];
    this.allSelectedProducts.push({...value});
    this.selectedProductsSubject.next(this.selectedProducts);
    this.allSelectedProductsSubject.next(this.allSelectedProducts);
  }

  eliminateSelectedProduct(value){
    this.selectedProducts = [...this.selectedProductsSubject.getValue()];
    this.allSelectedProducts = [...this.allSelectedProductsSubject.getValue()];
    this.selectedProducts = this.selectedProducts.filter(elem => elem.name != value.name);
    this.allSelectedProducts =   this.allSelectedProducts.filter(elem => elem.name != value.name);
    this.selectedProductsSubject.next(this.selectedProducts);
    this.allSelectedProductsSubject.next(this.allSelectedProducts);

  }

  eliminateCart(){
    this.selectedProductsSubject.next([]);
    this.allSelectedProductsSubject.next([]);
  }

  setCheckinMode(value){
    this.checkinModeSubject.next(value);
  }

  setSelectedProducts(value){
    this.selectedProductsSubject.next(value);
    this.allSelectedProductsSubject.next(value);
  }

  setCartMode(value){
    this.cartModeSubject.next(value);
  }

  chargeProducts(){
    this.getProducts().pipe(shareReplay()).subscribe(products =>
      this.productsSubject.next(products));
  }

  getProducts():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + 'products');
  }

  createProduct(product):Observable<any>{
    return this.http.post<any>(this.baseUrl + 'products',product);
  }

  deleteProduct(product):Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'products/' + product.id);
  }

  updateProduct(product):Observable<any>{
    return this.http.put<any>(this.baseUrl + 'products/' + product.id,product);
  } 

/*   createProduct(product){
    product.id = this.id;
    this.id +=1;
    let products = [...this.productsSubject.getValue()];
    let index = products.findIndex(elem => {
      let elemCopy = {...elem};
      return elemCopy.name.toUpperCase() == product.name.toUpperCase();
    } )
    if(index == -1){
      products.push(product);
      this.productsSubject.next(products);
    }
  }

  deleteProduct(product){
    let products = [...this.productsSubject.getValue()];
    products = products.filter(elem => elem.id != product.id);
    this.productsSubject.next(products);
  }

  updateProduct(product){
    let products = [...this.productsSubject.getValue()];
    let index = products.findIndex(elem => elem.id == product.id);
    if(index != -1){
      products[index] = {...product};
      this.productsSubject.next(products);
    }
  } 
  
  setProducts(products:any[]){
    products.map(elem => {
      elem.id = this.id;
      this.id +=1;
      return elem;
    });
    this.productsSubject.next(products);
  }
  */



}
