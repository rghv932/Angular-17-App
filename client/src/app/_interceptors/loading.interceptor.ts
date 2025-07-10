import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { delay, finalize } from 'rxjs';

import { BusyService } from '../_services/busy.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(BusyService);

  busyService.busy();
  
  return next(req).pipe(
      // tap((response)=>{
      //   //console.log('number : ',this.variable++);
      //   console.log(response instanceof HttpResponse,'this is the response:\n',response);
      //   //const headers=response.headers.get;
      //   if(response instanceof HttpResponse){
      //     const res=response as HttpResponse<any>;
      //     const headersList=res.headers;
      //     console.log(headersList);
      //     const result=res.headers.get('content-type');
      //     console.log('\n\n\n',result);
      //     const authResult=res.headers.get('access-control-allow-headers');
      //     console.log('\n\n\n',authResult);
      //   }
      // }),
      delay(1000),
      finalize(() => {
        busyService.idle();
      })
    );
};