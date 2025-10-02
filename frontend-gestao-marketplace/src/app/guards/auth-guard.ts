import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user';
import { UserAuthService } from '../service/user-auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  const hasToken = _userAuthService.getUserToken();
  if (!hasToken) {
    return _router.navigate(['/login']);
  }

  try {
    await firstValueFrom(_userService.validateUser());

    return true;
  } catch (error) {
    return _router.navigate(['/login']);
  }
};
