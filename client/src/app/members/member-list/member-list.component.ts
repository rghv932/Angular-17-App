import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { PaginationModule } from 'ngx-bootstrap/pagination';

import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule, NgIf],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  memberService = inject(MembersService);
  pageNumber = 1;
  pageSize = 5;
  // pagination: Pagination;
  // userParams: UserParams;
  // user: User;
  // genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];
  
  // constructor() { 
  //   this.userParams = this.memberService.getUserParams();
  // }

  ngOnInit(): void {
    if(!this.memberService.paginatedResult()) this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize);
    // this.memberService.setUserParams(this.userParams);
    // this.memberService.getMembers(this.userParams).subscribe({
    //   next: response =>  {
    //     this.members = response.result;
    //     this.pagination = response.pagination;
    //   }
    // });
  }

  // resetFilters() {
  //   this.userParams = this.memberService.resetUserParams();
  //   this.loadMembers();
  // }

  pageChanged(event: any) {
    // this.userParams.pageNumber = event.page;
    // this.memberService.setUserParams(this.userParams);
    if(this.pageNumber !== event.page){
      this.pageNumber = event.page;
      this.loadMembers();
    }
  }

}