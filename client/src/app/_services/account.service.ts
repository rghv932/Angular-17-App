import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { map } from 'rxjs';

import { User } from '../_models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl=environment.apiUrl;
  currentUser = signal<User | null>(null);
  // private currentUserSource=new ReplaySubject<User>(1);
  // currentUser$ = this.currentUserSource.asObservable();

  login(model:any){
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
      map((user:User)=>{
        if(user){
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }
  
  setCurrentUser(user:User){
    localStorage.setItem('user', JSON.stringify(user));
    // this.currentUserSource.next(user);
    this.currentUser.set(user);
  }

  logout(){
    localStorage.removeItem('user');
    // this.currentUserSource.next(null);
    this.currentUser.set(null);
  }
}
