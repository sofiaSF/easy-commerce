import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from 'querystring';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usersSubject: BehaviorSubject<any>;
  users$: Observable<any>;
  private userSubject: BehaviorSubject<any>;
  user$: Observable<any>;
  id= 0;

  port = "4000"
  baseUrl = "http://localhost:" + this.port + "/api/";

  constructor(private http: HttpClient) { 

    this.usersSubject = new BehaviorSubject<any>([]);
    this.users$ = this.usersSubject.asObservable();
    this.userSubject = new BehaviorSubject<any>(null);
    this.user$ = this.userSubject.asObservable();
  }

  chargeUsers(){
    this.getUsers().pipe(shareReplay()).subscribe(users =>
      this.usersSubject.next(users));
  }

  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl + 'users',{headers:  new HttpHeaders({'Content-Type': 'application/json'})});
  }

  createUser(user):Observable<any>{
    return this.http.post<any>(this.baseUrl + 'users',user,{headers:  new HttpHeaders({'Content-Type': 'application/json'})});
  }

  deleteUser(user):Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'users/' + user.id,{headers:  new HttpHeaders({'Content-Type': 'application/json'})});
  }

  updateUser(user):Observable<any>{
    return this.http.put<any>(this.baseUrl + 'users/' + user.id,user,{headers:  new HttpHeaders({'Content-Type': 'application/json'})});
  } 

  logIn(user):Observable<any>{
    return this.http.post<any>(this.baseUrl + 'login',user,{headers:  new HttpHeaders({'Content-Type': 'application/json;charset=utf-8'})});
  }

  setUser(user){
    this.userSubject.next(user);
  }
  
  logOut():Observable<any>{
    return this.http.delete<any>(this.baseUrl + 'logout',{headers:  new HttpHeaders({'Content-Type': 'application/json'})});
  }

  checkSession():Observable<any>{
    return this.http.get<any>(this.baseUrl + 'check',{headers:  new HttpHeaders({'Content-Type': 'application/json'})});
  }

  /* createUser(user){
    user.id = this.id;
    this.id +=1;
    let users = [...this.usersSubject.getValue()];
    let index = users.findIndex(elem => {
      let elemCopy = {...elem};
      return elemCopy.username.toUpperCase() == user.username.toUpperCase();
    } )
    if(index == -1){
      users.push(user);
      this.usersSubject.next(users);
    }
  }

  deleteUser(user){
    let users = [...this.usersSubject.getValue()];
    users = users.filter(elem => elem.id != user.id);
    this.usersSubject.next(users);
  }

  updateUser(user){
    let users = [...this.usersSubject.getValue()];
    let index = users.findIndex(elem => elem.id == user.id);
    if(index != -1){
      users[index] = {...user};
      this.usersSubject.next(users);
    }

   setUsers(users:any[]){
    users.map(elem => {
      elem.id = this.id;
      this.id +=1;
      return elem;
    });
    this.usersSubject.next(users);
  }
*/

}
