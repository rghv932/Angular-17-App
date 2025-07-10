import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AccountService } from '../_services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);

  if(accountService.currentUser()){
    return true;
  }else{
    toastrService.error('You shall not pass!');
    return false;
  }
  
};
