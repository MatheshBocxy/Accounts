import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AthuServiceService } from '../athuService/athu-service.service';

export const athuGuardGuard: CanActivateFn = (route, state) => {
  const authFinanceService = inject(AthuServiceService)
  const router = inject(Router)

  if(authFinanceService.isAuthenticated()){
    return true;
  }
  else{
    router.navigate(['']);
    return false;
  }
};
