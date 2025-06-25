import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  accountService = inject(AccountService)
  model:any={};

  // constructor(public accountService:AccountService,private router:Router,private toastService:ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next: res=>{
        // this.router.navigateByUrl('/members');
      },
      error: err => console.log(err)
    });
  }

  logout(){
    this.accountService.logout();
    // this.router.navigateByUrl('/');
  }
}
