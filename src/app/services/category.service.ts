import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categorySubject: BehaviorSubject<any>;
  category$: Observable<any>;
  id= 0;

  port = "4000";
  local = "http://localhost:" + this.port;
  prod = "https://easy-commerce-api.herokuapp.com";
  baseUrl =  this.prod + "/api/";

  constructor(private http: HttpClient) { 

    this.categorySubject = new BehaviorSubject<any>([]);
    this.category$ = this.categorySubject.asObservable();
  }

  chargeCategories(){
    this.getCategories().subscribe(categories =>
      this.categorySubject.next(categories));
  }

  setCategories(categories:any[]){
    categories.map(elem => {
      elem.id = this.id;
      this.id +=1;
      return elem;
    });
    this.categorySubject.next(categories);
  }

  getCategories():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + 'categories');
    //return this.category$;
  }

  createCategory(category):Observable<any>{
    return this.http.post<any>(this.baseUrl + 'categories',category);
  }

  deleteCategory(category):Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'categories/' + category.id);
  }

  updateCategory(category):Observable<any>{
    return this.http.put<any>(this.baseUrl + 'categories/' + category.id,category);
  }

  /* createCategory(category){
    category.id = this.id;
    this.id +=1;
    let categories = [...this.categorySubject.getValue()];
    let index = categories.findIndex(elem => {
      let elemCopy = {...elem};
      return elemCopy.name.toUpperCase() == category.name.toUpperCase();
    } )
    if(index == -1){
      categories.push(category);
      this.categorySubject.next(categories);
    }
  }

  deleteCategory(category){
    let categories = [...this.categorySubject.getValue()];
    categories = categories.filter(elem => elem.id != category.id);
    this.categorySubject.next(categories);
  }

  updateCategory(category){
    let categories = [...this.categorySubject.getValue()];
    let index = categories.findIndex(elem => elem.id == category.id);
    if(index != -1){
      categories[index] = {...category};
      this.categorySubject.next(categories);
    }

  } */

}
