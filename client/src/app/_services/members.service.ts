import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { map, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http= inject(HttpClient);
  // private accountService= inject(AccountService);
  baseUrl=environment.apiUrl;
  // members=signal<Member[]>([]);
  paginatedResult = signal<PaginatedResult<Member[]> | null>(null);
  //memberCache = new Map();
  // memberCache = new Map();
  // user: User;
  // userParams: UserParams;

  // constructor() {
  //   this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
  //     this.user = user;
  //     this.userParams = new UserParams(user);
  //   });
  // }

  // getUserParams() {
  //   return this.userParams;
  // }

  // setUserParams(params: UserParams) {
  //   this.userParams = params;
  // }

  // resetUserParams() {
  //   this.userParams = new UserParams(this.user);
  //   return this.userParams;
  // }

  // getMembers(){
  //   if (this.members.length > 0) return of(this.members);
  //   return this.http.get<Member[]>(this.baseUrl + 'users').subscribe({
  //     next: members => this.members.set(members)
  //   })
  // }

  getMembers(pageNumber?: number, pageSize?: number){
    let params = new HttpParams();

    if(pageNumber && pageSize){
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    return this.http.get<Member[]>(this.baseUrl + 'users', { observe: 'response', params }).subscribe({
      next: response  => {
        this.paginatedResult.set({
          items: response.body as Member[],
          pagination: JSON.parse(response.headers.get('Pagination')!)
        })
      }
    })
  }

  // getMembers(userParams: UserParams) {
  //   var response = this.memberCache.get(Object.values(userParams).join('-'));
  //   if (response) {
  //     return of(response);
  //   }

  //   let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

  //   params = params.append('minAge', userParams.minAge.toString());
  //   params = params.append('maxAge', userParams.maxAge.toString());
  //   params = params.append('gender', userParams.gender);
  //   params = params.append('orderBy', userParams.orderBy);

  //   return this.getPaginatedResult<Member[]>(this.baseUrl + 'users', params)
  //     .pipe(map(response => {
  //       this.memberCache.set(Object.values(userParams).join('-'), response);
  //       return response;
  //     }));
  // }

  getMember(username: string) {
    // const member = this.members().find(x=>x.username === username);
    // // const member = [...this.memberCache.values()]
    // //   .reduce((arr, elem) => arr.concat(elem.result), [])
    // //   .find((member: Member) => member.username === username);

    // if (member) {
    //   return of(member);
    // }
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m=>m.username === member.username ? member : m))
      // })
      // map(() => {
      //   const index = this.members.indexOf(member);
      //   this.members[index] = member;
      // })
    );
  }

  setMainPhoto(photo: Photo) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photo.id, {}).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m=>{
      //     if(m.photos.includes(photo)){
      //       m.photoUrl = photo.url;
      //     }
      //     return m;
      //   }))
      // })
    );
  }

  deletePhoto(photo: Photo) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photo.id).pipe(
      // tap(() => {
      //   this.members.update(members => members.map(m=>{
      //     if(m.photos.includes(photo)){
      //       m.photos = m.photos.filter(x=>x.id !== photo.id);
      //     }
      //     return m;
      //   }))
      // })
    )
  }

  addLike(username: string) {
    return this.http.post(this.baseUrl + 'likes/' + username, {})
  }

  // getLikes(predicate: string, pageNumber, pageSize) {
  //   let params = this.getPaginationHeaders(pageNumber, pageSize);
  //   params = params.append('predicate', predicate);
  //   return this.getPaginatedResult<Partial<Member[]>>(this.baseUrl + 'likes', params);
  // }

  // private getPaginatedResult<T>(url: string, params: HttpParams) {
  //   const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  //   return this.http.get<T>(url, { observe: 'response', params }).pipe(
  //     map(response => {
  //       paginatedResult.result = response.body;
  //       if (response.headers.get('Pagination') !== null) {
  //         paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
  //       }
  //       return paginatedResult;
  //     })
  //   );
  // }

  // private getPaginationHeaders(pageNumber: number, pageSize: number) {
  //   let params = new HttpParams();

  //   params = params.append('pageNumber', pageNumber.toString());
  //   params = params.append('pageSize', pageSize.toString());

  //   return params;
  // }

}
